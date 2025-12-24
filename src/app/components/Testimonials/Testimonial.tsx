"use client";

import Image from "next/image";
import TestimonialImg from "../../../../public/images/T1.jpg";
import QuoteImg from "../../../../public/icons/Quote.svg";
import { useEffect, useMemo, useState } from "react";
import { useKeenSlider, type KeenSliderInstance } from "keen-slider/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";

const API_PATH =
  "/homepage?populate[blocks][on][blocks.hero-section][populate][images]=true&populate[blocks][on][blocks.info-block][populate][image]=true&populate[testimonials]=true&populate[partners][populate][logo]=true";

const BASE_API_RAW = (process.env.NEXT_PUBLIC_BASE_API || "")
  .trim()
  .replace(/\/$/, "");

type Testimonial = {
  id?: number | string;
  message?: string;
  name?: string;
  role?: string;
};

// ✅ Local fallback testimonials
const fallbackTestimonials: Array<
  Required<Pick<Testimonial, "message" | "name" | "role">>
> = [
  {
    message:
      "Sollicitudin vitae diam senectus molestie cras in gravida egestas ac. Tortor condimentum suspendisse duis et velit donec turpis interdum elit.",
    name: "George Henry",
    role: "Donor",
  },
  {
    message:
      "Tincidunt ultrices eu vitae ut velit purus urna in. Ut maecenas amet ac dignissim vulputate viverra maecenas tempus in.",
    name: "Sarah Johnson",
    role: "Volunteer",
  },
  {
    message:
      "Cursus euismod nulla habitasse cras vitae sollicitudin iaculis pellentesque.",
    name: "Michael Smith",
    role: "Partner",
  },
];

type HomePageResponse = {
  data?: {
    testimonials?: unknown;
  };
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isTestimonial(v: unknown): v is Testimonial {
  if (!isRecord(v)) return false;

  const idOk =
    v.id === undefined || typeof v.id === "number" || typeof v.id === "string";

  const messageOk = v.message === undefined || typeof v.message === "string";
  const nameOk = v.name === undefined || typeof v.name === "string";
  const roleOk = v.role === undefined || typeof v.role === "string";

  return idOk && messageOk && nameOk && roleOk;
}

function normalizeTestimonials(input: unknown): Testimonial[] {
  if (!Array.isArray(input)) return [];
  return input.filter(isTestimonial);
}

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiTestimonials, setApiTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        if (!BASE_API_RAW) {
          console.warn("NEXT_PUBLIC_BASE_API is missing.");
          setApiTestimonials([]);
          return;
        }

        const res = await fetch(`${BASE_API_RAW}${API_PATH}`, {
          cache: "no-store",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Fetch failed: ${res.status} ${res.statusText} ${text}`
          );
        }

        const json: unknown = await res.json();
        const typed = json as HomePageResponse;

        // ✅ Your real response shape: json.data.testimonials
        const t = typed?.data?.testimonials;

        setApiTestimonials(normalizeTestimonials(t));
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: unknown }).name === "AbortError"
        ) {
          return;
        }

        console.error("Testimonials fetch error:", err);
        setApiTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  // ✅ Choose API testimonials or fallback (no unsafe casts)
  const testimonials: Testimonial[] = useMemo(() => {
    return apiTestimonials.length > 0 ? apiTestimonials : fallbackTestimonials;
  }, [apiTestimonials]);

  // ✅ Reset slide index if list changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [testimonials.length]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: testimonials.length > 1,
    slides: { perView: 1, spacing: 15 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const slider: KeenSliderInstance | null = instanceRef.current;
    if (!slider || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      slider.next();
    }, 6000);

    return () => window.clearInterval(timer);
  }, [instanceRef, testimonials.length]);

  return (
    <section className="bg-[#F8F9FA] h-full py-10 px-6 md:px-14">
      <div className="flex flex-col md:flex-row gap-x-7">
        <div className="w-full md:max-w-[50%]">
          <div className="max-w-[80px]">
            <Image src={QuoteImg} alt="quote image" />
          </div>

          <h3 className="text-[28px] text-[#0e372d] md:text-[34px] font-semibold mt-5 lg:mt-10 mb-3 leading-snug">
            Together, we can change lives for the better
          </h3>

          {isLoading && (
            <p className="text-sm text-gray-500 mt-2">Loading testimonials…</p>
          )}

          <div ref={sliderRef} className="keen-slider w-full max-w-2xl">
            {testimonials.map((t, i) => (
              <div key={t.id ?? i} className="keen-slider__slide">
                <p className="text-gray-700 md:mt-3 lg:mt-8">
                  {t.message?.trim()
                    ? t.message
                    : "No testimonial message provided."}
                </p>

                <div className="pt-4 lg:pt-7">
                  <p className="font-bold text-[#c4a54a]">
                    {t.name?.trim() ? t.name : "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.role?.trim() ? t.role : "Supporter"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === idx ? "bg-[#c4a54a]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="w-full md:max-w-[50%] mt-8 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={TestimonialImg}
            alt="Testimonial Image"
            className="w-full h-auto rounded-[15px]"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}

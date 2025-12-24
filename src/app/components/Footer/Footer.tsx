"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Logo from "../../../../public/icons/GHF-LOGO.png";
import Facebook from "../../../../public/icons/Facebook.svg";
import X from "../../../../public/icons/X.svg";
import Instagram from "../../../../public/icons/Instagram.svg";
import Tiktok from "../../../../public/icons/tiktok.png";

import { getGlobal } from "@/app/lib/getGlobal";

type RichTextNode = {
  type?: string;
  children?: Array<{ text?: string }>;
};

type StrapiMedia = {
  url?: string;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
    [key: string]: { url?: string } | undefined;
  };
  alternativeText?: string | null;
};

type GlobalResponse = {
  data?: {
    footer?: {
      logo?: {
        image?: StrapiMedia;
      };
      content?: RichTextNode[];
    };
    momo?: { Number?: string; Name?: string };
    bankInformation?: {
      bankName?: string;
      accountNumber?: string;
      accountName?: string;
      branch?: string;
    };
    social?: {
      facebookLink?: string | null;
      xLink?: string | null;
      linkedInLink?: string | null;
      instagramLink?: string | null;
      tiktokLink?: string | null;
    };
  };
};

function getBaseApiRaw() {
  return (process.env.NEXT_PUBLIC_BASE_API || "").trim().replace(/\/$/, "");
}

function getOriginBase() {
  const base = getBaseApiRaw();
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

function strapiAssetUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const origin = getOriginBase();
  if (!origin) return path;

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}

function pickBestStrapiImageUrl(img?: StrapiMedia | null) {
  if (!img) return "";
  const fmts = img.formats;
  const preferred =
    fmts?.large?.url ||
    fmts?.medium?.url ||
    fmts?.small?.url ||
    fmts?.thumbnail?.url ||
    img.url ||
    "";
  return strapiAssetUrl(preferred);
}

function extractPlainTextFromRichText(nodes: RichTextNode[]): string {
  if (!Array.isArray(nodes)) return "";
  return nodes
    .map((n) => {
      if (n?.type === "paragraph") {
        return (n?.children ?? []).map((c) => c?.text ?? "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

function safeHref(url: string) {
  const u = (url || "").trim();
  return u.length ? u : "#";
}

export default function Footer() {
  const year = new Date().getFullYear();

  const [globalData, setGlobalData] = useState<GlobalResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = (await getGlobal()) as GlobalResponse;
        if (mounted) setGlobalData(res);
      } catch {
        if (mounted) setGlobalData(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ fallback links (hardcoded)
  const fallbackSocial = useMemo(
    () => ({
      facebookLink:
        "https://www.web.facebook.com/profile.php?id=100075729007289",
      linkedInLink:
        "https://www.linkedin.com/company/golden-height-foundation/about/",
      xLink: "https://x.com/Goldenheight_gh?t=LViynigxig2P7iVUDZc_tg&s=08",
      instagramLink: "https://www.instagram.com/goldenheightfoundation/",
      tiktokLink:
        "https://www.tiktok.com/@golden.height.fou?_t=ZM-9006aRS1mWq&_r=1",
    }),
    []
  );

  const social = globalData?.data?.social ?? null;

  const socialLinks = useMemo(() => {
    const pick = (apiValue?: string | null, fb?: string) =>
      apiValue && apiValue.trim().length > 0 ? apiValue : fb || "";

    return {
      facebookLink: pick(social?.facebookLink, fallbackSocial.facebookLink),
      linkedInLink: pick(social?.linkedInLink, fallbackSocial.linkedInLink),
      xLink: pick(social?.xLink, fallbackSocial.xLink),
      instagramLink: pick(social?.instagramLink, fallbackSocial.instagramLink),
      tiktokLink: pick(social?.tiktokLink, fallbackSocial.tiktokLink),
    };
  }, [social, fallbackSocial]);

  const footerText =
    extractPlainTextFromRichText(globalData?.data?.footer?.content ?? []) ||
    "Golden Height Foundation is more than a charity, it is a movement of empathy, hope and action. By supporting children and empowering women, we aim to build stronger families and brighter communities where everyone can rise beyond limits, toward golden heights.";

  const momoNumber =
    globalData?.data?.momo?.Number?.trim() || "(+233) 55 685 3499";

  // ✅ FIX: your response structure is footer.logo.image.url (not footer.logo.image.image.url)
  const footerLogoUrl = pickBestStrapiImageUrl(
    globalData?.data?.footer?.logo?.image ?? null
  );

  // ✅ FIX: avoid href="" warnings
  const designerLink = "#";

  // ✅ FIX: avoid passing empty href to Link
  const fbHref = safeHref(socialLinks.facebookLink);
  const liHref = safeHref(socialLinks.linkedInLink);
  const xHref = safeHref(socialLinks.xLink);
  const igHref = safeHref(socialLinks.instagramLink);
  const tkHref = safeHref(socialLinks.tiktokLink);

  return (
    <footer className="bg-black py-10 px-6 md:px-14">
      <div className="flex flex-col gap-3.5 md:flex-row md:items-start md:justify-between">
        <div className="Info">
          <div className="w-[150px] md:w-[180px]">
            {footerLogoUrl ? (
              <Image
                src={footerLogoUrl}
                alt="Logo"
                width={180}
                height={60}
                priority={false}
              />
            ) : (
              <Image src={Logo} alt="Logo" />
            )}
          </div>

          <p className="text-white mt-2 whitespace-pre-wrap">{footerText}</p>

          <div className="mt-2">
            <p className="text-gray-400">
              <strong className="text-white">Momo number:</strong> {momoNumber}
            </p>

            <p className="text-gray-400 mt-1">
              <strong className="text-white">Address: </strong>P O Box UC 171,
              University of Cape Coast,
              <br />
              Cape Coast
            </p>

            <p className="text-gray-400 mt-1">
              <strong className="text-white">Our Office: </strong>De Rosetta
              Premises, Forecourt Valco Hall
              <br /> University of Cape Coast, Cape Coast
            </p>
          </div>
        </div>

        <div className="About w-full md:w-[50%]">
          <h3 className="text-white text-[25px] font-semibold">About Us</h3>
          <ul className="flex flex-col gap-1.5 mt-2.5">
            <li>
              <Link className="text-gray-300 hover:text-white" href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 hover:text-white" href="/partners">
                Partners
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 hover:text-white" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="Useful links w-full md:w-[50%]">
          <h3 className="text-white text-[25px] font-semibold">Useful Links</h3>
          <ul className="flex flex-col gap-1.5 mt-2.5">
            <li>
              <Link className="text-gray-300 hover:text-white" href="/news">
                News
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-300 hover:text-white"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-10">
        <div className="flex items-center gap-4">
          <Link href={fbHref} target="_blank" rel="noopener noreferrer">
            <Image
              src={Facebook}
              alt="Facebook Icon"
              className="opacity-50 hover:opacity-100 transition-all duration-100"
            />
          </Link>

          <Link
            href={liHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
          >
            <Linkedin className="text-black w-3.5 h-3.5" />
          </Link>

          <Link href={xHref} target="_blank" rel="noopener noreferrer">
            <Image
              src={X}
              alt="X Icon"
              className="opacity-50 hover:opacity-100 transition-all duration-100"
            />
          </Link>

          <Link href={igHref} target="_blank" rel="noopener noreferrer">
            <Image
              src={Instagram}
              alt="Instagram Icon"
              className="opacity-50 hover:opacity-100 transition-all duration-100"
            />
          </Link>

          <Link
            href={tkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
          >
            <Image src={Tiktok} alt="Tiktok Icon" className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-gray-300 text-[13px]">
          © Copyright Golden Height Foundation {year}. Design by{" "}
          <Link href={designerLink} className="underline hover:text-white">
            Future Script
          </Link>
        </p>
      </div>
    </footer>
  );
}

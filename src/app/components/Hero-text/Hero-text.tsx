import Link from "next/link";
import Image from "next/image";

interface HeroTextProps {
  title?: string;
  description?: string;
  breadcrumb?: { name: string; href?: string }[];
}

export default function HeroText({
  title = "United for Good, Strong for Charity",
  description = "Libero dictum ut purus ut vel sit egestas. Ut ac mattis senectus ac suspendisse vitae vel nulla eleifend. Est eros facilisi aenean nisl a. Vitae et fusce purus consectetur.",
  breadcrumb = [{ name: "Home", href: "/" }, { name: "About Us" }],
}: HeroTextProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 md:px-14 h-full md:py-6">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-gray-600 my-3"
      >
        {breadcrumb.map((item, index) => (
          <span key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-900">
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">{item.name}</span>
            )}
            {index < breadcrumb.length - 1 && (
              <Image
                src="/icons/hero-right.svg"
                alt=""
                aria-hidden="true"
                width={12}
                height={12}
                className="h-3 w-3 opacity-60 mx-1"
              />
            )}
          </span>
        ))}
      </nav>

      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-[25px] md:text-[45px] font-semibold text-[#0e372d]">
          {title}
        </h2>
        <p className="mt-2 max-w-prose text-gray-700">{description}</p>
      </div>
    </div>
  );
}

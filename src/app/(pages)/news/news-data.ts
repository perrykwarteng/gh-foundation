import { StaticImageData } from "next/image";

import Image1 from "../../../../public/images/B1.svg";
import Image2 from "../../../../public/images/B2.svg";
import Image3 from "../../../../public/images/B3.svg";
import Image4 from "../../../../public/images/B1.svg";
import Image5 from "../../../../public/images/B2.svg";
import Image6 from "../../../../public/images/B3.svg";

export const BRAND = {
  ACCENT: "#c4a54a",
  DEEP: "#0e372d",
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: StaticImageData;
  content: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "holiday-sale-kickoff",
    title: "Holiday Sale Kickoff: Up to 25% Off",
    date: "2025-08-28",
    description:
      "Seasonal bundles and limited-time discounts across bestsellers.",
    image: Image4,
    content:
      "### Holiday Kickoff\n\nWe’re celebrating early with curated bundles and site-wide deals.\n\n**Highlights**\n- Up to 25% off\n- Bundle & save\n- Free gift on orders over GHS 600",
  },
  {
    slug: "customer-spotlight-ama",
    title: "Customer Spotlight: Ama’s Signature Picks",
    date: "2025-08-20",
    description:
      "A longtime customer shares her favorite picks and how she styles them.",
    image: Image5,
    content:
      "Meet **Ama**, a community favorite. She walks us through daily routines, top notes, and repeat buys.\n\n> “Quality that lasts all day.”\n\n- Top 3 picks\n- Layering tips\n- Styling for evening events",
  },
  {
    slug: "sustainability-report-2025",
    title: "Sustainability Report 2025",
    date: "2025-08-12",
    description: "Our progress on packaging, sourcing, and community programs.",
    image: Image6,
    content:
      "We’ve reduced plastic across select lines and expanded refill options.\n\n**Key Metrics**\n- 32% packaging reduction YoY\n- 100% recycled mailers\n- Community drive in East Legon",
  },
  {
    slug: "mobile-app-update-2-0",
    title: "Mobile App v2.0: Faster Checkout & Wallet",
    date: "2025-08-05",
    description:
      "A smoother experience with saved addresses and a new in-app wallet.",
    image: Image1,
    content:
      "#### What’s new\n- 2× faster checkout\n- Address book & order history\n- Wallet with promo credits\n\nUpdate now to get a welcome bonus.",
  },
  {
    slug: "weekend-pop-up-market",
    title: "Weekend Pop-Up Market at A&C Mall",
    date: "2025-07-27",
    description:
      "Live demos, freebies, and early access to next month’s drops.",
    image: Image2,
    content:
      "Join us this weekend! First 50 visitors get a mini sampler pack.\n\n**Schedule**\n- 10:00 — Doors open\n- 12:30 — Layering workshop\n- 15:00 — Giveaways",
  },
  {
    slug: "hiring-warehouse-associate",
    title: "We’re Hiring: Warehouse Associate",
    date: "2025-07-15",
    description:
      "Help us pick, pack, and delight customers. Competitive pay + staff perks.",
    image: Image3,
    content:
      "If you’re detail-oriented and love fast-paced teams, we’d love to meet you.\n\n**Role**\n- Pick & pack orders\n- Inventory counts\n- QA checks\n\nSend your CV via careers@yourdomain.com.",
  },
];

export function getNewsBySlug(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}

export function formatDate(d: string) {
  try {
    const date = new Date(d);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return d;
  }
}

// import { Metadata } from "next";
import { Hero } from "./components/Hero/Hero";
import Into from "./components/Into/Into";
import Layout from "./components/Layouts/AppLayout";
import Organization from "./components/Organization/Organization";
import Projects from "./components/Projects/Projects";
import Regions from "./components/Regions/Region";
import Stats from "./components/Stats/Stats";
import Testimonials from "./components/Testimonials/Testimonial";
import Transform from "./components/Transform/Transform";

// export const metadata: Metadata = {
//   title: {
//     default: "Golden Height Foundation",
//     template: "%s | Golden Height Foundation",
//   },
//   description:
//     "Golden Height Foundation is more than a charity, it is a movement of empathy, hope and action. By supporting children and empowering women, we aim to build stronger families and brighter communities where everyone can rise beyond limits, toward golden heights.",
//   keywords: [
//     "Golden Height Foundation",
//     "Charity",
//     "Non-profit",
//     "Community Development",
//     "Child Welfare",
//     "Child empowerment",
//   ],
//   icons: {
//     icon: "/favicon.ico",
//   },
//   authors: [{ name: "Golden Height Foundation" }],
//   metadataBase: new URL("https://goldenheightfoundation.org"),

//   // openGraph: {
//   //   title: "Golden Height Foundation",
//   //   description:
//   //     "Golden Height Foundation is more than a charity, it is a movement of empathy, hope and action. By supporting children and empowering them.",
//   //   url: "https://goldenheightfoundation.org",
//   //   siteName: "Golden Height Foundation",
//   //   images: [
//   //     {
//   //       url: "/images/og-image.jpg",
//   //       width: 1200,
//   //       height: 630,
//   //       alt: "Golden Height Foundation",
//   //     },
//   //   ],
//   //   type: "website",
//   // },

//   // twitter: {
//   //   card: "summary_large_image",
//   //   title: "Golden Height Foundation",
//   //   description: "Golden Height Foundation is more than a charity, it is a movement of empathy, hope and action. By supporting children and empowering them.",
//   //   images: ["/images/og-image.jpg"],
//   // },
// };

export default async function Home() {
  return (
    <Layout>
      <Hero />
      <Transform />
      <Into />
      <Projects />
      <Regions />
      <Stats />
      <Testimonials />
      <Organization />
    </Layout>
  );
}

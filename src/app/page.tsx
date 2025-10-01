import { Hero } from "./components/Hero/Hero";
import Into from "./components/Into/Into";
import Layout from "./components/Layouts/AppLayout";
import Projects from "./components/Projects/Projects";
import Regions from "./components/Regions/Region";
import Stats from "./components/Stats/Stats";
import Testimonials from "./components/Testimonials/Testimonial";
import Transform from "./components/Transform/Transform";
import Blog from "./components/Blog/Blog";
import Gallery from "./components/Gallery/Gallery";
import Organization from "./components/Organization/Organization";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Transform />
      <Into />
      <Projects />
      <Regions />
      <Stats />
      <Testimonials />
    </Layout>
  );
}

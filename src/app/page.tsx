import { Hero } from "./components/Hero/Hero";
import Into from "./components/Into/Into";
import Layout from "./components/Layouts/AppLayout";
import Organization from "./components/Organization/Organization";
import Projects from "./components/Projects/Projects";
import Regions from "./components/Regions/Region";
import Stats from "./components/Stats/Stats";
import Testimonials from "./components/Testimonials/Testimonial";
import Transform from "./components/Transform/Transform";

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
      <Organization />
    </Layout>
  );
}

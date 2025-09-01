import { Hero } from "./components/Hero/Hero";
import Into from "./components/Into/Into";
import Layout from "./components/Layouts/AppLayout";
import Transform from "./components/Transform/Transform";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Transform />
      <Into />
    </Layout>
  );
}

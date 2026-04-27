import { About } from "@/components/sections/about";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FinalCTA />
    </>
  );
}

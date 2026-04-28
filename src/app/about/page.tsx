import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI developer based in Cologne, Germany. Building practical AI solutions for businesses: chatbots, automations, and MVP web apps. Every project ends with you owning everything.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

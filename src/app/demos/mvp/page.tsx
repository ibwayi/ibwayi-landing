import type { Metadata } from "next";
import { DemoPageTemplate } from "@/components/demo-page-template";
import { MVP_DATA } from "@/content/demos/mvp";

export const metadata: Metadata = {
  title: "MVP Web App Demo",
  description:
    "Full-stack MVP web apps with auth, database, payments, and AI features. Production-ready in 2-6 weeks. From idea to launch with you owning everything.",
  alternates: {
    canonical: "/demos/mvp",
  },
};

export default function MvpDemoPage() {
  return <DemoPageTemplate data={MVP_DATA} />;
}

import type { Metadata } from "next";
import { DemoPageTemplate } from "@/components/demo-page-template";
import { AUTOMATION_DATA } from "@/content/demos/automation";

export const metadata: Metadata = {
  title: "AI Automation Demo",
  description:
    "Webhook-driven AI workflows that connect your apps and save hours every week. Lead enrichment, email triage, content pipelines. Live demo available.",
  alternates: {
    canonical: "/demos/automation",
  },
};

export default function AutomationDemoPage() {
  return <DemoPageTemplate data={AUTOMATION_DATA} />;
}

import type { Metadata } from "next";
import { DemosHubClient } from "./demos-client";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "See Ibwayi's three services in action: AI Chatbots, AI Automation, and MVP Web Apps. Live demos with real interactions, no signup required.",
  alternates: {
    canonical: "/demos",
  },
};

export default function DemosPage() {
  return <DemosHubClient />;
}

import type { Metadata } from "next";
import { DemoPageTemplate } from "@/components/demo-page-template";
import { CHATBOT_DATA } from "@/content/demos/chatbot";

export const metadata: Metadata = {
  title: "AI Chatbot Demo",
  description:
    "Custom AI chatbots that know your business. FAQ bots, lead qualifiers, customer support. Built around your products, integrated with your tools. Try the live demo.",
  alternates: {
    canonical: "/demos/chatbot",
  },
};

export default function ChatbotDemoPage() {
  return <DemoPageTemplate data={CHATBOT_DATA} />;
}

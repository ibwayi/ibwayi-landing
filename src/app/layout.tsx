import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { ChatWidget } from "@/components/chat-widget";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibwayi.com"),
  title: {
    default: "Ibwayi — Custom AI Solutions Developer",
    template: "%s | Ibwayi",
  },
  description:
    "Custom AI chatbots, automation workflows, and MVP web apps. Built for businesses that want practical AI without vendor lock-in. Based in Cologne, Germany.",
  applicationName: "Ibwayi",
  authors: [{ name: "Pascal Gudioni", url: "https://ibwayi.com" }],
  creator: "Pascal Gudioni",
  publisher: "Ibwayi",
  keywords: [
    "AI developer",
    "custom chatbot",
    "AI automation",
    "MVP web app",
    "OpenAI integration",
    "Anthropic Claude",
    "freelance AI engineer",
    "Cologne developer",
    "Next.js developer",
    "Supabase",
    "Stripe integration",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibwayi.com",
    siteName: "Ibwayi",
    title: "Ibwayi — Custom AI Solutions Developer",
    description:
      "Custom AI chatbots, automation workflows, and MVP web apps. Built for businesses that want practical AI without vendor lock-in.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ibwayi — Custom AI. Done right. Shipped fast.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibwayi — Custom AI Solutions Developer",
    description: "Custom AI chatbots, automation workflows, and MVP web apps.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Nav />
          {/*
           * Footer lives INSIDE <main> on purpose. If it sat outside, short
           * pages would let the body's flex column push it to the viewport
           * bottom — causing layout shift between long and short routes.
           */}
          <main className="flex flex-1 flex-col pt-24">
            {children}
            <Footer />
          </main>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}

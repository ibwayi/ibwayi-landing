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
  title: "Ibwayi, AI Solutions Developer",
  description: "Custom AI chatbots, automations, and MVP web apps.",
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

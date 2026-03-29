export const revalidate = 60;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPageData } from "@/lib/queries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const { personalInfo: { name, title, tagline } } = await getPageData();
  const fullTitle = `${name} — ${title}`;

  return {
    title: fullTitle,
    description: tagline,
    keywords: [name, "Software Engineer", "React", "Next.js", "React Native", "Portfolio", "Full-Stack"],
    authors: [{ name }],
    openGraph: {
      type: "website",
      title: fullTitle,
      description: tagline,
      siteName: `${name} Portfolio`,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: tagline,
    },
    icons: {
      icon: "/icon.svg",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { personalInfo } = await getPageData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AmbientBackground />
          <Navbar />
          <main>{children}</main>
          <Footer personalInfo={personalInfo} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

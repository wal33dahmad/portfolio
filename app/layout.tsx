import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPersonalInfo } from "@/lib/queries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Waleed Ahmed — Full-Stack Web & Mobile Developer",
  description:
    "Full-Stack Web & Mobile Developer building scalable products. Specializes in React, Next.js, and React Native with a focus on performant interfaces and end-to-end delivery.",
  keywords: [
    "Waleed Ahmed",
    "Software Engineer",
    "React",
    "Next.js",
    "React Native",
    "Portfolio",
    "Full-Stack",
  ],
  authors: [{ name: "Waleed Ahmed" }],
  openGraph: {
    type: "website",
    title: "Waleed Ahmed — Full-Stack Web & Mobile Developer",
    description:
      "Full-Stack Web & Mobile Developer building scalable products. Specializes in React, Next.js, and React Native.",
    siteName: "Waleed Ahmed Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed Ahmed — Full-Stack Web & Mobile Developer",
    description:
      "Full-Stack Web & Mobile Developer building scalable products. Specializes in React, Next.js, and React Native.",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personalInfo = await getPersonalInfo();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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

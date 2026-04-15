import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vikaskannur.com"),
  title: {
    default: "Vikas Kannur | Full-Stack Engineer & UI/UX Designer",
    template: "%s | Vikas Kannur"
  },
  description: "Cinematic, high-performance digital portfolio of Vikas Kannur. I Engineer Digital Dopamine.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vikaskannur.com", // update with actual domain later
    title: "Vikas Kannur | Full-Stack Engineer & UI/UX Designer",
    description: "Cinematic, high-performance digital portfolio of Vikas Kannur.",
    images: [
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Vikas Kannur Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikas Kannur | Full-Stack Engineer & UI/UX Designer",
    description: "Cinematic, high-performance digital portfolio of Vikas Kannur. I Engineer Digital Dopamine.",
    images: ["/images/og-default.webp"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased selection:bg-brand selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

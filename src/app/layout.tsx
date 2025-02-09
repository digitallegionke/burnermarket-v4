import React from 'react';
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Burner Market Co.",
  description: "Unleash Your Healthy, Creative Magic in Every Kitchen Creation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Algorithm Visualizer",
  description: "Interactive algorithm visualizer built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#07111f] text-slate-100 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
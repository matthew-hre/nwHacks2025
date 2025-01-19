import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const myanmar = localFont({
  src: "./MyanmarKhyay.ttf",
  display: "swap",
  variable: "--myanmar",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myanmar.variable} font-sans text-brand-brown antialiased min-h-screen`}
      >
        <Logo />
        {children}
        <Navbar />
      </body>
    </html>
  );
}

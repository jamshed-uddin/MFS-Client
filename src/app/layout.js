import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/providers/SessionProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Transactly",
  description: "Powering Your transactions, Instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-tr from-white to-sky-100  h-screen   overflow-y-auto`}
      >
        {children}
      </body>
    </html>
  );
}

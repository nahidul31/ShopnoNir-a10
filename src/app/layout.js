import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalChrome from "@/ui-assets/shared/ConditionalChrome";
import { ToastProvider } from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopnoNir — Property Rental & Booking",
  description: "Find and book rental properties across Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full light antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalChrome>{children}</ConditionalChrome>
        <ToastProvider placement="top" />
      </body>
    </html>
  );
}

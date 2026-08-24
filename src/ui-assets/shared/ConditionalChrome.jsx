"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/ui-assets/shared/Navbar";
import Footer from "@/ui-assets/shared/Footer";

const hiddenPrefixes = ["/dashboard"];

export default function ConditionalChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = hiddenPrefixes.some((prefix) =>
    pathname?.startsWith(prefix),
  );

  if (hideChrome) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const propertyLinks = [
  { name: "Apartments", href: "/properties?type=apartment" },
  { name: "Houses", href: "/properties?type=house" },
  { name: "Office Spaces", href: "/properties?type=office" },
  { name: "Featured Properties", href: "/properties?featured=true" },
  { name: "Latest Listings", href: "/properties?sort=latest" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: "ri:facebook-fill",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "ri:instagram-line",
  },
  {
    name: "X",
    href: "#",
    icon: "ri:twitter-x-line",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: "ri:linkedin-fill",
  },
  {
    name: "YouTube",
    href: "#",
    icon: "ri:youtube-fill",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-300">
      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ================= BRAND ================= */}
          <div className="lg:pr-8">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C93B5B] shadow-lg shadow-[#C93B5B]/20">
                <Icon
                  icon="solar:home-2-bold"
                  width="23"
                  className="text-white"
                />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">Shopno</span>
                <span className="text-[#C93B5B]">Nir</span>
              </span>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Find your perfect home with ease. Explore verified properties,
              compare prices, and book your ideal place with confidence.
            </p>

            {/* Social Media */}
            <div className="mt-7">
              <h4 className="mb-4 text-sm font-semibold text-white">
                Follow Us
              </h4>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#C93B5B] hover:bg-[#C93B5B] hover:text-white"
                  >
                    <Icon
                      icon={social.icon}
                      width="18"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-base font-bold text-white">Quick Links</h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#C93B5B]"
                  >
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="15"
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= PROPERTY ================= */}
          <div>
            <h3 className="text-base font-bold text-white">Properties</h3>

            <ul className="mt-5 space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#C93B5B]"
                  >
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="15"
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-base font-bold text-white">Contact Us</h3>

            <div className="mt-5 space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                  <Icon
                    icon="solar:map-point-bold"
                    width="19"
                    className="text-[#C93B5B]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Address</p>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Chattogram, Bangladesh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                  <Icon
                    icon="solar:phone-bold"
                    width="19"
                    className="text-[#C93B5B]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Phone</p>

                  <p className="mt-1 text-sm text-gray-400">+880 1XXX-XXXXXX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                  <Icon
                    icon="solar:letter-bold"
                    width="19"
                    className="text-[#C93B5B]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Email</p>

                  <p className="mt-1 text-sm text-gray-400">
                    support@homenest.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            {/* Text */}
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                  <Icon
                    icon="solar:letter-opened-bold"
                    width="17"
                    className="text-[#C93B5B]"
                  />
                </div>

                <span className="text-xs font-bold tracking-widest text-[#C93B5B]">
                  NEWSLETTER
                </span>
              </div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Get the Latest Property Updates
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Subscribe to our newsletter and stay updated with new
                properties, exclusive offers, and useful tips.
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                variant="bordered"
                radius="lg"
                size="lg"
                classNames={{
                  input: "text-white",
                  inputWrapper:
                    "border-white/10 bg-white/5 hover:border-[#C93B5B] group-data-[focus=true]:border-[#C93B5B]",
                }}
              />

              <Button
                size="lg"
                radius="lg"
                className="bg-[#C93B5B] px-7 font-bold text-white transition-all duration-300 hover:bg-[#B33250] hover:shadow-lg hover:shadow-[#C93B5B]/20"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {year}{" "}
            <span className="font-semibold text-gray-300">HomeNest</span>. All
            rights reserved.
          </p>

          {/* Policies */}
          <div className="flex items-center justify-center gap-5 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 transition-colors hover:text-[#C93B5B]"
            >
              Privacy Policy
            </Link>

            <span className="h-4 w-px bg-white/10" />

            <Link
              href="/terms"
              className="text-gray-500 transition-colors hover:text-[#C93B5B]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

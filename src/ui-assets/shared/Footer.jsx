"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Properties", href: "/all-properties" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Log in", href: "/login" },
  { name: "Register", href: "/register" },
];

const propertyLinks = [
  { name: "Apartments", href: "/all-properties?propertyType=apartment" },
  { name: "Houses", href: "/all-properties?propertyType=house" },
  { name: "Villas", href: "/all-properties?propertyType=villa" },
  { name: "Rooms", href: "/all-properties?propertyType=room" },
  { name: "Office Spaces", href: "/all-properties?propertyType=office" },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: "ri:facebook-fill" },
  { name: "Instagram", href: "#", icon: "ri:instagram-line" },
  { name: "X", href: "#", icon: "ri:twitter-x-line" },
  { name: "LinkedIn", href: "#", icon: "ri:linkedin-fill" },
  { name: "YouTube", href: "#", icon: "ri:youtube-fill" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#A61C3C] via-[#7A1F2B] to-[#4A0E1A] shadow-lg shadow-[#A61C3C]/25 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-6">
                <span className="absolute -right-2 -top-3 h-7 w-7 rounded-full bg-white/15" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative h-5 w-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
                  <path d="M10 21v-5.5a2 2 0 0 1 4 0V21" />
                </svg>
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-2xl font-extrabold tracking-tight">
                  <span className="text-white">Shopno</span>
                  <span className="text-[#E8688A]">Nir</span>
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  Rent with ease
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Find your perfect home with ease. Explore verified properties,
              compare prices, and book your ideal place with confidence.
            </p>

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
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#A61C3C] hover:bg-[#A61C3C] hover:text-white"
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

          <div>
            <h3 className="text-base font-bold text-white">Quick Links</h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#E8688A]"
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

          <div>
            <h3 className="text-base font-bold text-white">Properties</h3>

            <ul className="mt-5 space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#E8688A]"
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

          <div>
            <h3 className="text-base font-bold text-white">Contact Us</h3>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                  <Icon
                    icon="solar:map-point-bold"
                    width="19"
                    className="text-[#E8688A]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Address</p>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Chattogram, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                  <Icon
                    icon="solar:phone-bold"
                    width="19"
                    className="text-[#E8688A]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Phone</p>

                  <p className="mt-1 text-sm text-gray-400">+880 1XXX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                  <Icon
                    icon="solar:letter-bold"
                    width="19"
                    className="text-[#E8688A]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Email</p>

                  <p className="mt-1 text-sm text-gray-400">
                    support@shopnonir.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                  <Icon
                    icon="solar:letter-opened-bold"
                    width="17"
                    className="text-[#E8688A]"
                  />
                </div>

                <span className="text-xs font-bold tracking-widest text-[#E8688A]">
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
                    "border-white/10 bg-white/5 hover:border-[#A61C3C] group-data-[focus=true]:border-[#A61C3C]",
                }}
              />

              <Button
                size="lg"
                radius="lg"
                className="bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-7 font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#A61C3C]/25"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {year}{" "}
            <span className="font-semibold text-gray-300">ShopnoNir</span>. All
            rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5 text-sm">
            <Link
              href="/all-properties"
              className="text-gray-500 transition-colors hover:text-[#E8688A]"
            >
              Browse Properties
            </Link>

            <span className="h-4 w-px bg-white/10" />

            <Link
              href="/dashboard"
              className="text-gray-500 transition-colors hover:text-[#E8688A]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

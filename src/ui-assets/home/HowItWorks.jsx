import Link from "next/link";
import { Icon } from "@iconify/react";

const STEPS = [
  {
    number: "01",
    icon: "solar:magnifer-bold-duotone",
    title: "Find a place",
    text: "Search by location, filter by type and rent range, and shortlist the ones you like with a single tap.",
  },
  {
    number: "02",
    icon: "solar:card-bold-duotone",
    title: "Book securely",
    text: "Send a booking request with your move-in date and pay through Stripe. Your card details never touch our servers.",
  },
  {
    number: "03",
    icon: "solar:key-square-bold-duotone",
    title: "Move in",
    text: "The owner reviews your request and confirms. Track everything from your dashboard until you get the keys.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#FDF2F3] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-default-900">
            How ShopnoNir works
          </h2>
          <p className="text-default-500 text-sm mt-2">
            Three steps from browsing to moving in
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#F0DADD] relative"
            >
              <span className="absolute top-6 right-7 text-4xl font-bold text-[#FBE7EA] select-none">
                {step.number}
              </span>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] flex items-center justify-center mb-5 shadow-md shadow-[#7A1F2B]/25">
                <Icon icon={step.icon} width={28} className="text-white" />
              </div>

              <h3 className="font-semibold text-lg text-default-900">
                {step.title}
              </h3>

              <p className="text-sm text-default-500 mt-2 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/all-properties"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 hover:opacity-95 transition-opacity"
          >
            Start browsing
            <Icon icon="solar:arrow-right-linear" width={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

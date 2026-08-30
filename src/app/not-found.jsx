import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* 404 with a house sitting in the zero */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <span
            className="text-[110px] sm:text-[150px] font-bold leading-none tracking-tight select-none"
            style={{
              background:
                "linear-gradient(135deg, #A61C3C 0%, #7A1F2B 50%, #4A0E1A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-lg shadow-[#7A1F2B]/20 border border-[#F0DADD] flex items-center justify-center">
              <Icon
                icon="solar:home-2-bold-duotone"
                className="text-3xl sm:text-4xl text-[#A61C3C]"
              />
            </span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-default-900">
          This address doesn&apos;t exist
        </h1>

        <p className="text-default-500 text-sm sm:text-base mt-3 leading-relaxed">
          The page you were looking for may have been moved, or the link was
          typed incorrectly. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 hover:opacity-95 transition-opacity"
          >
            <Icon icon="solar:home-smile-bold" width={18} />
            Back to Home
          </Link>

          <Link
            href="/all-properties"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-default-300 px-7 py-3.5 text-sm font-medium text-default-600 hover:bg-default-50 hover:border-[#A61C3C] hover:text-[#A61C3C] transition-colors"
          >
            <Icon icon="solar:magnifer-linear" width={18} />
            Browse Properties
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-default-200">
          <p className="text-xs text-default-400 mb-4">Or try one of these</p>

          <div className="flex items-center justify-center gap-6 flex-wrap text-sm">
            <Link
              href="/dashboard"
              className="text-default-600 hover:text-[#A61C3C] transition-colors"
            >
              Dashboard
            </Link>

            <span className="w-1 h-1 rounded-full bg-default-300" />

            <Link
              href="/all-properties"
              className="text-default-600 hover:text-[#A61C3C] transition-colors"
            >
              All Properties
            </Link>

            <span className="w-1 h-1 rounded-full bg-default-300" />

            <Link
              href="/login"
              className="text-default-600 hover:text-[#A61C3C] transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

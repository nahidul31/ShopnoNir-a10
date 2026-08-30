"use client";

import { Icon } from "@iconify/react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // অনেক পাতা হলে সবগুলো না দেখিয়ে আশেপাশের কয়েকটা দেখানো
  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-default-300 text-default-600 hover:border-[#A61C3C] hover:text-[#A61C3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-default-300 disabled:hover:text-default-600"
        aria-label="Previous page"
      >
        <Icon icon="solar:alt-arrow-left-linear" width={17} />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-9 h-9 flex items-center justify-center text-default-400 text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white shadow-md shadow-[#7A1F2B]/30"
                : "border border-default-300 text-default-600 hover:border-[#A61C3C] hover:text-[#A61C3C]"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-default-300 text-default-600 hover:border-[#A61C3C] hover:text-[#A61C3C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-default-300 disabled:hover:text-default-600"
        aria-label="Next page"
      >
        <Icon icon="solar:alt-arrow-right-linear" width={17} />
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/ui-assets/home/all-properties-data/PropertyCard";
import Pagination from "@/ui-assets/shared/Pagination";

const PER_PAGE = 6;

export default function PropertyGrid({ properties }) {
  const [page, setPage] = useState(1);

  // ফিল্টার বদলে নতুন ডেটা এলে আবার প্রথম পাতায়
  useEffect(() => {
    setPage(1);
  }, [properties]);

  const totalPages = Math.ceil(properties.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = properties.slice(start, start + PER_PAGE);

  const handlePageChange = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-default-500">No properties match your search.</p>
        <p className="text-default-400 text-sm mt-1">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

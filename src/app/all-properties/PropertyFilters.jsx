"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

const propertyTypes = [
  "apartment",
  "house",
  "villa",
  "office",
  "room",
  "studio",
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //
  const [form, setForm] = useState({
    search: searchParams.get("search") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildParams = (overrides = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    const merged = { ...form, ...overrides };

    Object.entries(merged).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    return params;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/all-properties?${buildParams().toString()}`);
  };

  //
  const handleInstant = (key, value) => {
    const params = buildParams();

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/all-properties?${params.toString()}`);
  };

  const handleReset = () => {
    setForm({ search: "", minPrice: "", maxPrice: "" });
    router.push("/all-properties");
  };

  const hasFilters = searchParams.toString().length > 0;

  const fieldClass =
    "w-full rounded-lg border border-default-300 px-3 py-2.5 text-sm text-default-800 outline-none transition-colors focus:border-[#A61C3C] focus:ring-2 focus:ring-[#F0DADD]";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-default-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Location search */}
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-default-600">
            Location
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-default-400">
              <Icon icon="solar:map-point-broken" width={16} />
            </span>
            <input
              type="text"
              value={form.search}
              placeholder="Search by location..."
              onChange={(e) => handleChange("search", e.target.value)}
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        {/* Property type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-default-600">
            Property Type
          </label>
          <select
            value={searchParams.get("propertyType") || ""}
            onChange={(e) => handleInstant("propertyType", e.target.value)}
            className={`${fieldClass} capitalize bg-white cursor-pointer`}
          >
            <option value="">All types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Min price */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-default-600">
            Min Price
          </label>
          <input
            type="number"
            value={form.minPrice}
            placeholder="৳ 0"
            onChange={(e) => handleChange("minPrice", e.target.value)}
            className={fieldClass}
          />
        </div>

        {/* Max price */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-default-600">
            Max Price
          </label>
          <input
            type="number"
            value={form.maxPrice}
            placeholder="৳ 100000"
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Sort + buttons */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-default-600 whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={searchParams.get("sort") || ""}
            onChange={(e) => handleInstant("sort", e.target.value)}
            className="rounded-lg border border-default-300 px-3 py-2 text-sm bg-white cursor-pointer outline-none focus:border-[#A61C3C]"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-2">
          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-default-300 px-4 py-2.5 text-sm font-medium text-default-600 transition-colors hover:bg-default-50"
            >
              Reset
            </button>
          )}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#7A1F2B]/30 transition-all hover:shadow-lg"
          >
            <Icon icon="solar:magnifer-broken" width={16} />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

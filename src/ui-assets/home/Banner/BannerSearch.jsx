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

const emptyForm = {
  search: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
};

export default function BannerSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    search: searchParams.get("search") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (form.search.trim()) params.set("search", form.search.trim());
    if (form.propertyType) params.set("propertyType", form.propertyType);
    if (form.minPrice) params.set("minPrice", form.minPrice);
    if (form.maxPrice) params.set("maxPrice", form.maxPrice);

    router.push(`/?${params.toString()}#properties`);
  };

  const handleReset = () => {
    setForm(emptyForm);
    router.push("/#properties");
  };

  const hasFilters = searchParams.toString().length > 0;

  const fieldClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-[#C93B5B] focus:ring-2 focus:ring-[#C93B5B]/10";

  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm sm:p-5"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Location */}
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Location
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon icon="solar:map-point-broken" width={16} />
            </span>
            <input
              type="text"
              value={form.search}
              placeholder="Dhaka, Chattogram..."
              onChange={(e) => handleChange("search", e.target.value)}
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        {/* Property type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Property Type
          </label>
          <select
            value={form.propertyType}
            onChange={(e) => handleChange("propertyType", e.target.value)}
            className={`${fieldClass} capitalize bg-white cursor-pointer`}
          >
            <option value="">Any type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Min price */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
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
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
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

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#C93B5B] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C93B5B]/30 transition-all hover:bg-[#B33250]"
        >
          <Icon icon="solar:magnifer-broken" width={18} />
          Search Properties
        </button>

        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            <Icon icon="solar:restart-broken" width={18} />
            Reset
          </button>
        )}
      </div>
    </form>
  );
}

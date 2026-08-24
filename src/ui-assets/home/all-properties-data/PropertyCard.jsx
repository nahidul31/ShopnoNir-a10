"use client";

import Link from "next/link";
import { Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function PropertyCard({ property }) {
  if (!property) return null;

  const {
    _id,
    title,
    location,
    propertyType,
    rent,
    rentType,
    bedrooms,
    bathrooms,
    images = [],
  } = property;

  return (
    <div className="group bg-white border border-default-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-default-100">
        {images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-default-400">
            <Icon icon="solar:home-broken" width={40} />
          </div>
        )}

        {/* Property type */}
        <div className="absolute top-3 right-3">
          <Chip
            variant="flat"
            size="sm"
            className="capitalize bg-white/80 backdrop-blur-sm"
          >
            {propertyType}
          </Chip>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-semibold text-default-800 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-default-500 text-sm mt-1">
            <Icon icon="solar:map-point-broken" width={15} />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Bed / Bath */}
        <div className="flex items-center gap-4 text-default-600 text-sm">
          <span className="flex items-center gap-1">
            <Icon icon="solar:bed-broken" width={16} />
            {bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Icon icon="solar:bath-broken" width={16} />
            {bathrooms} Baths
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-default-100">
          <div>
            <span className="text-lg font-bold text-default-800">৳{rent}</span>
            <span className="text-default-400 text-xs">
              /{rentType === "monthly" ? "mo" : rentType}
            </span>
          </div>

          <Link href={`/all-properties/${_id}`}>
            <Button size="sm" color="primary" variant="flat">
              View
              <Icon icon="solar:arrow-right-linear" width={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

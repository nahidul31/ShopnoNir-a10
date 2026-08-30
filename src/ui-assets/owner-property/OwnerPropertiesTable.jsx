"use client";

import { useState } from "react";
import Link from "next/link";
import { Chip, Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import EditPropertyModal from "./EditPropertyModal";
import ViewFeedbackModal from "./ViewFeedbackModal";
import DeletePropertyModal from "@/ui-assets/shared/DeletePropertyModal";
import Pagination from "@/ui-assets/shared/Pagination";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const statusIconMap = {
  pending: "solar:clock-circle-bold",
  approved: "solar:check-circle-bold",
  rejected: "solar:close-circle-bold",
};

const columns = [
  "IMAGE",
  "TITLE",
  "LOCATION",
  "TYPE",
  "RENT",
  "STATUS",
  "ACTIONS",
];

const PER_PAGE = 8;

export default function OwnerPropertiesTable({ properties, token }) {
  const [page, setPage] = useState(1);

  if (!properties?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <Icon icon="solar:home-2-broken" width={40} />
        <p>You haven&apos;t listed any properties yet.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(properties.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = properties.slice(start, start + PER_PAGE);

  return (
    <div>
      <div className="overflow-x-auto border border-default-200 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-default-100">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 font-semibold text-xs uppercase text-default-600 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visible.map((property) => (
              <tr
                key={property._id}
                className="border-t border-default-200 hover:bg-default-50 transition-colors"
              >
                {/* IMAGE — clickable */}
                <td className="px-4 py-3">
                  <Link href={`/all-properties/${property._id}`}>
                    {property.images?.[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-14 h-14 object-cover rounded-lg border border-default-200 hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-default-100 text-default-400">
                        <Icon icon="solar:home-broken" width={22} />
                      </div>
                    )}
                  </Link>
                </td>

                {/* TITLE — clickable */}
                <td className="px-4 py-3">
                  <Link
                    href={`/all-properties/${property._id}`}
                    className="block group"
                  >
                    <p className="font-medium text-default-800 group-hover:text-[#A61C3C] transition-colors">
                      {property.title}
                    </p>
                    <p className="text-xs text-default-400 line-clamp-1 max-w-[200px]">
                      {property.description}
                    </p>
                  </Link>
                </td>

                {/* LOCATION */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-default-600">
                    <Icon icon="solar:map-point-broken" width={16} />
                    {property.location}
                  </div>
                </td>

                {/* TYPE */}
                <td className="px-4 py-3">
                  <Chip variant="flat" size="sm" className="capitalize w-fit">
                    {property.propertyType}
                  </Chip>
                </td>

                {/* RENT */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-semibold text-default-800">
                    ৳{property.rent}
                  </span>
                  <span className="text-default-400 text-xs">
                    /
                    {property.rentType === "monthly" ? "mo" : property.rentType}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <Chip
                    color={statusColorMap[property.status] || "default"}
                    variant="flat"
                    size="sm"
                    className="capitalize flex items-center gap-1 w-fit"
                  >
                    <Icon
                      icon={
                        statusIconMap[property.status] ||
                        "solar:question-circle-bold"
                      }
                      width={14}
                    />
                    {property.status}
                  </Chip>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Tooltip content="View details">
                      <Button
                        as={Link}
                        href={`/all-properties/${property._id}`}
                        isIconOnly
                        size="sm"
                        variant="tertiary"
                      >
                        <Icon icon="solar:eye-broken" width={18} />
                      </Button>
                    </Tooltip>

                    {property.status === "rejected" && (
                      <ViewFeedbackModal property={property} />
                    )}

                    <EditPropertyModal property={property} token={token} />

                    <DeletePropertyModal property={property} token={token} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

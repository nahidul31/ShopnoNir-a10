"use client";

import { useState } from "react";
import { Chip } from "@heroui/react";
import Link from "next/link";
import Pagination from "@/ui-assets/shared/Pagination";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const columns = ["PROPERTY", "TENANT", "MOVE-IN", "AMOUNT", "STATUS"];

const PER_PAGE = 8;

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBookingsTable({ bookings }) {
  const [page, setPage] = useState(1);

  if (!bookings?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <p>No bookings found.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(bookings.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = bookings.slice(start, start + PER_PAGE);

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
            {visible.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-default-200 hover:bg-default-50 transition-colors"
              >
                {/* PROPERTY — image + title + location */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {booking.propertyImage ? (
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="w-11 h-11 object-cover rounded-lg border border-default-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-default-100 shrink-0" />
                    )}

                    <div className="min-w-0">
                      <Link
                        href={`/all-properties/${booking.propertyId}`}
                        className="font-medium text-default-800 hover:text-[#A61C3C] transition-colors line-clamp-1"
                      >
                        {booking.propertyTitle}
                      </Link>
                      <p className="text-xs text-default-400 line-clamp-1">
                        {booking.location}
                      </p>
                    </div>
                  </div>
                </td>

                {/* TENANT — name + email */}
                <td className="px-4 py-3">
                  <p className="text-default-800">{booking.tenantName}</p>
                  <p className="text-xs text-default-400">
                    {booking.tenantEmail}
                  </p>
                </td>

                {/* MOVE-IN + booked date */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="text-default-700">
                    {formatDate(booking.moveInDate)}
                  </p>
                  <p className="text-xs text-default-400">
                    booked {formatDate(booking.createdAt)}
                  </p>
                </td>

                {/* AMOUNT + payment */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="font-semibold text-default-800">
                    ৳{booking.amount}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      booking.paymentStatus === "paid"
                        ? "text-success-600"
                        : "text-default-400"
                    }`}
                  >
                    {booking.paymentStatus || "unpaid"}
                  </p>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <Chip
                    color={statusColorMap[booking.status] || "default"}
                    variant="flat"
                    size="sm"
                    className="capitalize w-fit"
                  >
                    {booking.status}
                  </Chip>
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

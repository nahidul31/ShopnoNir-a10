import { Chip } from "@heroui/react";
import Link from "next/link";
import BookingActions from "./BookingActions";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const paymentColorMap = {
  paid: "success",
  unpaid: "default",
};

const columns = [
  "PROPERTY",
  "TENANT",
  "MOVE-IN",
  "AMOUNT",
  "PAYMENT",
  "STATUS",
  "ACTIONS",
];

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BookingRequestsTable({ bookings }) {
  if (!bookings?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <p>No booking requests yet.</p>
      </div>
    );
  }

  return (
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
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="border-t border-default-200 hover:bg-default-50 transition-colors"
            >
              {/* PROPERTY */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {booking.propertyImage ? (
                    <img
                      src={booking.propertyImage}
                      alt={booking.propertyTitle}
                      className="w-12 h-12 object-cover rounded-lg border border-default-200 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-default-100 shrink-0" />
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

              {/* TENANT */}
              <td className="px-4 py-3">
                <p className="font-medium text-default-800">
                  {booking.tenantName}
                </p>
                <p className="text-xs text-default-400">
                  {booking.tenantEmail}
                </p>
                <p className="text-xs text-default-500 mt-0.5">
                  {booking.contactNumber}
                </p>
              </td>

              {/* MOVE-IN */}
              <td className="px-4 py-3 text-default-600 whitespace-nowrap">
                {formatDate(booking.moveInDate)}
              </td>

              {/* AMOUNT */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-semibold text-default-800">
                  ৳{booking.amount ?? booking.rent}
                </span>
                <span className="text-default-400 text-xs">
                  /{booking.rentType === "monthly" ? "mo" : booking.rentType}
                </span>
              </td>

              {/* PAYMENT */}
              <td className="px-4 py-3">
                <Chip
                  color={paymentColorMap[booking.paymentStatus] || "default"}
                  variant="flat"
                  size="sm"
                  className="capitalize w-fit"
                >
                  {booking.paymentStatus}
                </Chip>
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

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <BookingActions booking={booking} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

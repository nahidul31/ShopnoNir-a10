import { Chip } from "@heroui/react";
import Link from "next/link";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const columns = [
  "PROPERTY",
  "TENANT",
  "OWNER",
  "MOVE-IN",
  "AMOUNT",
  "PAYMENT",
  "STATUS",
  "BOOKED ON",
  "TRANSACTION",
];

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBookingsTable({ bookings }) {
  if (!bookings?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <p>No bookings found.</p>
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
              {/* PROPERTY — clickable */}
              <td className="px-4 py-3">
                <Link
                  href={`/all-properties/${booking.propertyId}`}
                  className="block group"
                >
                  <p className="font-medium text-default-800 group-hover:text-[#A61C3C] transition-colors">
                    {booking.propertyTitle}
                  </p>
                  <p className="text-xs text-default-400 line-clamp-1 max-w-[180px]">
                    {booking.location}
                  </p>
                </Link>
              </td>

              {/* TENANT */}
              <td className="px-4 py-3">
                <p className="text-default-800">{booking.tenantName}</p>
                <p className="text-xs text-default-400">
                  {booking.tenantEmail}
                </p>
              </td>

              {/* OWNER */}
              <td className="px-4 py-3">
                <p className="text-default-800">{booking.ownerName}</p>
                <p className="text-xs text-default-400">{booking.ownerEmail}</p>
              </td>

              {/* MOVE-IN */}
              <td className="px-4 py-3 text-default-600 whitespace-nowrap">
                {formatDate(booking.moveInDate)}
              </td>

              {/* AMOUNT */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-semibold text-default-800">
                  ৳{booking.amount}
                </span>
              </td>

              {/* PAYMENT */}
              <td className="px-4 py-3">
                <Chip
                  color={
                    booking.paymentStatus === "paid" ? "success" : "default"
                  }
                  variant="flat"
                  size="sm"
                  className="capitalize w-fit"
                >
                  {booking.paymentStatus || "unpaid"}
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

              {/* BOOKED ON */}
              <td className="px-4 py-3 text-default-600 whitespace-nowrap">
                {formatDate(booking.createdAt)}
              </td>

              {/* TRANSACTION */}
              <td className="px-4 py-3">
                <p className="font-mono text-xs text-default-500 max-w-[140px] truncate">
                  {booking.transactionId || "—"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

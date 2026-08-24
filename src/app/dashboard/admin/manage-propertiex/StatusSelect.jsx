"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["pending", "approved", "rejected"];

export default function StatusSelect({ propertyId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/property/${propertyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus(previousStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <select
      value={status}
      disabled={updating}
      onChange={handleChange}
      className="border border-default-300 rounded-lg px-3 py-2 text-sm capitalize bg-white cursor-pointer hover:border-default-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {statuses.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}

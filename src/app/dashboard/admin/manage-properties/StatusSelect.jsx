"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const statuses = ["pending", "approved"];

export default function StatusSelect({ propertyId, currentStatus, token }) {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

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
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
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
      className="border border-default-300 rounded-lg px-3 py-2 text-sm capitalize bg-white cursor-pointer hover:border-default-400 focus:outline-none focus:ring-2 focus:ring-[#F0DADD] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {status === "rejected" && (
        <option value="rejected" className="capitalize">
          rejected
        </option>
      )}

      {statuses.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}

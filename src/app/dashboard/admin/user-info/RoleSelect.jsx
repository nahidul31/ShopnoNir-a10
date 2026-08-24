"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = ["owner", "tenant", "admin"];

export default function RoleSelect({ userId, currentRole, disabled = false }) {
  const [role, setRole] = useState(currentRole);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleChange = async (e) => {
    const newRole = e.target.value;
    const previousRole = role;

    setRole(newRole);
    setUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      setRole(previousRole);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <select
      value={role}
      disabled={disabled || updating}
      onChange={handleChange}
      title={disabled ? "You can't change your own role" : undefined}
      className="border border-default-300 rounded-lg px-3 py-2 text-sm capitalize bg-white cursor-pointer hover:border-default-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {roles.map((r) => (
        <option key={r} value={r} className="capitalize">
          {r}
        </option>
      ))}
    </select>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Tooltip, toast } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function BookingActions({ booking }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (newStatus) => {
    setUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) throw new Error("Failed");

      toast.success(
        newStatus === "approved" ? "Booking approved" : "Booking rejected",
        {
          description: `${booking.tenantName}'s request for "${booking.propertyTitle}".`,
        },
      );

      router.refresh();
    } catch (err) {
      console.error(err);
      toast.danger("Failed to update booking");
    } finally {
      setUpdating(false);
    }
  };

  // already decided — no actions needed
  if (booking.status !== "pending") {
    return (
      <span className="text-xs text-default-400 whitespace-nowrap">
        No action needed
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Approve booking">
        <Button
          isIconOnly
          size="sm"
          variant="tertiary"
          isDisabled={updating}
          onPress={() => handleUpdate("approved")}
        >
          <Icon
            icon="solar:check-circle-broken"
            width={18}
            className="text-success-600"
          />
        </Button>
      </Tooltip>

      <Tooltip content="Reject booking">
        <Button
          isIconOnly
          size="sm"
          variant="danger-soft"
          isDisabled={updating}
          onPress={() => handleUpdate("rejected")}
        >
          <Icon icon="solar:close-circle-broken" width={18} />
        </Button>
      </Tooltip>
    </div>
  );
}

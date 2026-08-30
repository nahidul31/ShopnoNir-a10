"use client";

import { useState } from "react";
import { toast } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function PaymentForm({ bookingDetails }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // booking details
      sessionStorage.setItem("pendingBooking", JSON.stringify(bookingDetails));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingDetails }),
        },
      );

      const data = await res.json();

      if (!data.url) throw new Error("Could not start checkout");

      // Stripe
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.danger("Could not start payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="border border-default-200 rounded-2xl p-6">
      <h2 className="font-semibold text-default-800 mb-2">Payment</h2>
      <p className="text-sm text-default-500 mb-6">
        You&apos;ll be redirected to Stripe&apos;s secure checkout page to
        complete your payment.
      </p>

      <div className="bg-default-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon
            icon="solar:shield-check-bold"
            width={22}
            className="text-success-600 shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-default-800">
              Secure checkout
            </p>
            <p className="text-xs text-default-500 mt-0.5">
              Your card details never touch our servers
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Redirecting to Stripe..."
          : `Pay $${bookingDetails.amount} with Stripe`}
      </button>

      <p className="text-xs text-default-400 mt-4 text-center">
        Test card: 4242 4242 4242 4242 · any future date · any CVC
      </p>
    </div>
  );
}

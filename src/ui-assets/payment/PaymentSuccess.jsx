"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function PaymentSuccess({ sessionId }) {
  const [status, setStatus] = useState("verifying");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const bookingDetails = sessionStorage.getItem("pendingBooking");

    if (!bookingDetails) {
      setStatus("error");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_URL}/api/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        bookingDetails: JSON.parse(bookingDetails),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.alreadyExists) {
          setStatus("success");
          setTransactionId(data.transactionId || sessionId);
          sessionStorage.removeItem("pendingBooking");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [sessionId]);

  if (status === "verifying") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <Icon
          icon="solar:refresh-broken"
          width={40}
          className="animate-spin text-[#A61C3C] mb-4"
        />
        <p className="text-default-500">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <Icon
          icon="solar:danger-triangle-bold"
          width={44}
          className="text-warning-500 mb-4"
        />
        <h1 className="text-xl font-semibold text-default-800">
          Could not confirm payment
        </h1>
        <p className="text-default-500 text-sm mt-2 max-w-md">
          If money was deducted, please contact support with your payment
          receipt.
        </p>
        <Link
          href="/all-properties"
          className="mt-6 rounded-full border border-default-300 px-6 py-3 text-sm font-medium text-default-600"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
          <Icon
            icon="solar:check-circle-bold"
            width={44}
            className="text-success-600"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-default-900">
          Payment Successful
        </h1>

        <p className="text-default-500 mt-3 leading-relaxed">
          Your booking request has been sent to the property owner. You&apos;ll
          be notified once they respond.
        </p>

        {transactionId && (
          <div className="mt-6 bg-default-50 rounded-xl px-4 py-3">
            <p className="text-xs text-default-400">Transaction ID</p>
            <p className="text-sm font-mono text-default-700 mt-1 break-all">
              {transactionId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/dashboard/tenant/my-booking"
            className="flex-1 rounded-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7A1F2B]/30"
          >
            View My Bookings
          </Link>

          <Link
            href="/all-properties"
            className="flex-1 rounded-full border border-default-300 px-6 py-3 text-sm font-medium text-default-600 hover:bg-default-50 transition-colors"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, toast } from "@heroui/react";
import { Icon } from "@iconify/react";

function StarRating({ rating, onChange, size = 28 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Icon
            icon={star <= rating ? "solar:star-bold" : "solar:star-linear"}
            width={size}
            className={star <= rating ? "text-amber-400" : "text-default-300"}
          />
        </button>
      ))}
    </div>
  );
}

export default function SiteReviewForm({ user, token }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (rating === 0) {
      toast.warning("Please give a rating");
      return;
    }

    if (!comment.trim()) {
      toast.warning("Please write your feedback");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/site-reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            rating,
            comment: comment.trim(),
          }),
        },
      );

      if (res.status === 409) {
        toast.warning("You've already shared your feedback");
        return;
      }

      if (!res.ok) throw new Error("Failed");

      toast.success("Thank you for your feedback!");
      setRating(0);
      setComment("");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.danger("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-white border border-default-200 rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] flex items-center justify-center mx-auto mb-4">
            <Icon
              icon="solar:chat-square-like-bold"
              width={26}
              className="text-white"
            />
          </div>

          <h2 className="text-2xl font-bold text-default-900">
            Share your experience
          </h2>
          <p className="text-default-500 text-sm mt-2">
            Tell us how ShopnoNir worked for you
          </p>
        </div>

        {user ? (
          <div className="space-y-5">
            {/* User info */}
            <div className="flex items-center gap-3 bg-default-50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-white">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-default-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-default-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="text-center">
              <p className="text-sm font-medium text-default-700 mb-3">
                How would you rate us?
              </p>
              <div className="flex justify-center">
                <StarRating rating={rating} onChange={setRating} />
              </div>
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              rows={4}
              disabled={submitting}
              placeholder="What did you like? What could be better?"
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-default-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0DADD] focus:border-[#A61C3C] transition-colors disabled:opacity-60"
            />

            <Button
              onPress={handleSubmit}
              isDisabled={submitting}
              className="w-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white font-semibold"
              size="lg"
              radius="full"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-default-500 mb-4">
              Please log in to share your feedback
            </p>
            <Button
              onPress={() => router.push("/login")}
              className="bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white"
              radius="full"
            >
              Log in
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

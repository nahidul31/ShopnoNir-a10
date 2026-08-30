"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, toast } from "@heroui/react";
import { Icon } from "@iconify/react";

function StarRating({ rating, onChange, readonly = false, size = 20 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          className={readonly ? "cursor-default" : "cursor-pointer"}
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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PropertyReviews({ propertyId, user, token }) {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/reviews?propertyId=${propertyId}`,
      );
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

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
      toast.warning("Please write a review");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId,
          tenantName: user.name,
          tenantEmail: user.email,
          rating,
          comment: comment.trim(),
        }),
      });

      if (res.status === 409) {
        toast.warning("You've already reviewed this property");
        return;
      }

      if (!res.ok) throw new Error("Failed");

      toast.success("Review posted");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.danger("Failed to post review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="mt-10 pt-8 border-t border-default-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-default-800">
          Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} readonly size={16} />
            <span className="text-sm font-medium text-default-700">
              {avgRating}
            </span>
          </div>
        )}
      </div>

      {/* Write review */}
      {user ? (
        <div className="bg-default-50 rounded-2xl p-5 mb-8">
          <p className="text-sm font-medium text-default-800 mb-3">
            Write a review
          </p>

          <div className="mb-3">
            <p className="text-xs text-default-500 mb-1.5">Your rating</p>
            <StarRating rating={rating} onChange={setRating} size={26} />
          </div>

          <textarea
            value={comment}
            rows={3}
            disabled={submitting}
            placeholder="Share your experience with this property..."
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-default-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F0DADD] focus:border-[#A61C3C] transition-colors disabled:opacity-60"
          />

          <Button
            onPress={handleSubmit}
            isDisabled={submitting}
            size="sm"
            className="mt-3 bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white"
          >
            {submitting ? "Posting..." : "Post Review"}
          </Button>
        </div>
      ) : (
        <div className="bg-default-50 rounded-2xl p-5 mb-8 text-center">
          <p className="text-sm text-default-500">
            Please log in to write a review.
          </p>
        </div>
      )}

      {/* Review list */}
      {loading ? (
        <p className="text-sm text-default-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <Icon
            icon="solar:chat-round-line-broken"
            width={40}
            className="text-default-300 mx-auto mb-2"
          />
          <p className="text-sm text-default-400">
            No reviews yet. Be the first to review.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-default-100 pb-5 last:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FBE7EA] flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-[#8C1C2B]">
                    {review.tenantName?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-sm font-medium text-default-800">
                        {review.tenantName}
                      </p>
                      <p className="text-xs text-default-400">
                        {review.tenantEmail}
                      </p>
                    </div>
                    <span className="text-xs text-default-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <StarRating rating={review.rating} readonly size={14} />
                  </div>

                  <p className="text-sm text-default-600 mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Icon } from "@iconify/react";

async function getSiteReviews(limit = 4) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/site-reviews?limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={star <= rating ? "solar:star-bold" : "solar:star-linear"}
          width={size}
          className={star <= rating ? "text-amber-400" : "text-default-300"}
        />
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

export default async function CustomerReviews() {
  const reviews = await getSiteReviews(4);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#FBE7EA] text-[#8C1C2B] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
          <Icon icon="solar:chat-round-line-bold" width={16} />
          Testimonials
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold text-default-900 tracking-tight mt-5">
          What our <span className="text-[#8C1C2B]">tenants say</span>
        </h2>

        <p className="text-default-500 text-sm sm:text-base mt-3 max-w-md mx-auto">
          Real experiences from people who found their home through ShopnoNir
        </p>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-default-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <Icon
              icon="solar:quote-up-square-bold"
              width={28}
              className="text-[#F0DADD] mb-3"
            />

            <p className="text-default-600 text-sm leading-relaxed line-clamp-4 flex-1">
              {review.comment}
            </p>

            <div className="mt-4">
              <StarRating rating={review.rating} />
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-default-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-white">
                  {review.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-default-800 truncate">
                  {review.name}
                </p>
                <p className="text-xs text-default-400">
                  {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

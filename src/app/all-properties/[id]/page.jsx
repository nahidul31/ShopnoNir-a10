import { Icon } from "@iconify/react";
import { Chip, Button } from "@heroui/react";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const statusIconMap = {
  pending: "solar:clock-circle-bold",
  approved: "solar:check-circle-bold",
  rejected: "solar:close-circle-bold",
};

const amenityIconMap = {
  wifi: "solar:wi-fi-router-broken",
  parking: "solar:wheel-broken",
  security: "solar:shield-check-broken",
  furnished: "solar:sofa-broken",
  ac: "solar:snowflake-broken",
  lift: "solar:elevator-broken",
  generator: "solar:socket-broken",
  gas: "solar:fire-broken",
};

async function getProperty(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/property/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;

  const property = await getProperty(id);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Icon
          icon="solar:home-broken"
          width={48}
          className="text-default-300 mb-4"
        />
        <h2 className="text-xl font-semibold text-default-700">
          Property not found
        </h2>
        <p className="text-default-400 text-sm mt-1">
          The property you're looking for doesn't exist or was removed.
        </p>
      </div>
    );
  }

  const {
    title,
    description,
    location,
    propertyType,
    rent,
    rentType,
    bedrooms,
    bathrooms,
    size,
    extraFeatures,
    ownerName,
    amenities = [],
    images = [],
    status,
  } = property;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: image + details */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden bg-default-100">
            {images[0] ? (
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-default-400">
                <Icon icon="solar:home-broken" width={48} />
              </div>
            )}

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <Chip
                color={statusColorMap[status] || "default"}
                variant="flat"
                size="sm"
                className="capitalize flex items-center gap-1 backdrop-blur-sm bg-white/80"
              >
                <Icon
                  icon={statusIconMap[status] || "solar:question-circle-bold"}
                  width={13}
                />
                {status}
              </Chip>
            </div>

            {/* Property type */}
            <div className="absolute top-4 right-4">
              <Chip
                variant="flat"
                size="sm"
                className="capitalize bg-white/80 backdrop-blur-sm"
              >
                {propertyType}
              </Chip>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-default-900">
              {title}
            </h1>
            <div className="flex items-center gap-1 text-default-500 text-sm mt-2">
              <Icon icon="solar:map-point-broken" width={16} />
              {location}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center gap-6 mt-6 py-4 border-y border-default-200 text-default-700">
            <span className="flex items-center gap-2 text-sm">
              <Icon
                icon="solar:bed-broken"
                width={20}
                className="text-primary-600"
              />
              {bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Icon
                icon="solar:bath-broken"
                width={20}
                className="text-primary-600"
              />
              {bathrooms} Bathrooms
            </span>
            {size && (
              <span className="flex items-center gap-2 text-sm">
                <Icon
                  icon="solar:ruler-cross-pen-broken"
                  width={20}
                  className="text-primary-600"
                />
                {size} sqft
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-default-800 mb-2">
              Description
            </h2>
            <p className="text-default-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-default-800 mb-3">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex items-center gap-1.5 text-sm text-default-600 bg-default-100 px-3 py-1.5 rounded-full capitalize"
                  >
                    <Icon
                      icon={
                        amenityIconMap[amenity?.toLowerCase()] ||
                        "solar:check-circle-broken"
                      }
                      width={15}
                    />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extra features */}
          {extraFeatures && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-default-800 mb-2">
                Extra Features
              </h2>
              <p className="text-default-600 text-sm flex items-center gap-2">
                <Icon
                  icon="solar:star-broken"
                  width={16}
                  className="text-primary-600"
                />
                {extraFeatures}
              </p>
            </div>
          )}

          {/* Owner */}
          <div className="mt-10 pt-6 border-t border-default-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <Icon
                icon="solar:user-broken"
                width={20}
                className="text-primary-600"
              />
            </div>
            <div>
              <p className="text-xs text-default-400">Listed by</p>
              <p className="text-sm font-medium text-default-800">
                {ownerName}
              </p>
            </div>
          </div>
        </div>

        {/* Right: sticky booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 border border-default-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-5">
              <span className="text-2xl sm:text-3xl font-bold text-primary-600">
                ৳{rent}
              </span>
              <span className="text-default-400 text-sm ml-1">
                / {rentType === "monthly" ? "Monthly" : rentType}
              </span>
            </div>

            <Button
              color="primary"
              size="lg"
              radius="full"
              className="w-full font-semibold"
            >
              Book Now
            </Button>

            <Button
              variant="bordered"
              size="lg"
              radius="full"
              className="w-full mt-3 font-medium"
              startContent={<Icon icon="solar:heart-broken" width={18} />}
            >
              Add to Favorites
            </Button>

            <div className="mt-6 space-y-2">
              <p className="flex items-center gap-2 text-sm text-default-500">
                <Icon
                  icon="solar:shield-check-bold"
                  width={16}
                  className="text-success-500"
                />
                Verified Property
              </p>
              <p className="flex items-center gap-2 text-sm text-default-500">
                <Icon
                  icon="solar:lock-keyhole-minimalistic-bold"
                  width={16}
                  className="text-success-500"
                />
                Secure Payment
              </p>
              <p className="flex items-center gap-2 text-sm text-default-500">
                <Icon
                  icon="solar:bolt-bold"
                  width={16}
                  className="text-success-500"
                />
                Instant Booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

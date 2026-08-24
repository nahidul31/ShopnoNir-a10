import { getApprovedProperties } from "@/lib/api/get-properties";
import PropertyCard from "./PropertyCard";

const AllProperties = async () => {
  const properties = await getApprovedProperties();

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20 text-default-500">
        No properties found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Heading */}
      <div className="relative text-center mb-14">
        {/* Soft glow background */}
        <div
          className="absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-72 h-72 rounded-full blur-3xl opacity-20 bg-primary-400" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white border border-default-200 shadow-sm text-default-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          {properties.length} listings available
        </span>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-default-900 tracking-tight mt-6 leading-tight">
          Find your next
          <br />
          <span className="text-primary-600">perfect place</span>
        </h2>

        {/* Subtitle */}
        <p className="text-default-500 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          Browse verified rental properties across Bangladesh — apartments,
          villas, rooms and more, all in one place.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-12 h-[3px] rounded-full bg-primary-200" />
          <span className="w-3 h-3 rounded-full bg-primary-500" />
          <span className="w-12 h-[3px] rounded-full bg-primary-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;

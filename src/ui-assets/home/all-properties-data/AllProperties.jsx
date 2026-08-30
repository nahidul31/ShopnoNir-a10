import PropertyCard from "./PropertyCard";

async function getFilteredProperties(searchParams) {
  const params = new URLSearchParams();
  params.set("status", "approved");

  if (searchParams?.search) params.set("search", searchParams.search);
  if (searchParams?.propertyType)
    params.set("propertyType", searchParams.propertyType);
  if (searchParams?.minPrice) params.set("minPrice", searchParams.minPrice);
  if (searchParams?.maxPrice) params.set("maxPrice", searchParams.maxPrice);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/property?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

const AllProperties = async ({ searchParams }) => {
  const properties = await getFilteredProperties(searchParams);

  const hasFilters =
    searchParams?.search ||
    searchParams?.propertyType ||
    searchParams?.minPrice ||
    searchParams?.maxPrice;

  return (
    <div
      id="properties"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20"
    >
      {/* Heading */}
      <div className="relative text-center mb-14">
        <div
          className="absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-72 h-72 rounded-full blur-3xl opacity-20 bg-[#A61C3C]" />
        </div>

        <span className="inline-flex items-center gap-2 bg-white border border-default-200 shadow-sm text-default-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          {properties.length}{" "}
          {hasFilters ? "matching listings" : "listings available"}
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-default-900 tracking-tight mt-6 leading-tight">
          {hasFilters ? "Search" : "Find your next"}
          <br />
          <span className="text-[#8C1C2B]">
            {hasFilters ? "results" : "perfect place"}
          </span>
        </h2>

        <p className="text-default-500 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          {hasFilters
            ? `Showing properties matching your search${
                searchParams?.search ? ` in "${searchParams.search}"` : ""
              }`
            : "Browse verified rental properties across Bangladesh — apartments, villas, rooms and more, all in one place."}
        </p>

        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-12 h-[3px] rounded-full bg-[#F0DADD]" />
          <span className="w-3 h-3 rounded-full bg-[#A61C3C]" />
          <span className="w-12 h-[3px] rounded-full bg-[#F0DADD]" />
        </div>
      </div>

      {/* Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-default-500">No properties match your search.</p>
          <p className="text-default-400 text-sm mt-1">
            Try a different location or price range.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;

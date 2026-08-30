import PropertyCard from "@/ui-assets/home/all-properties-data/PropertyCard";
import PropertyFilters from "./PropertyFilters";
// import PropertyFilters from "@/ui-assets/all-properties/PropertyFilters";

async function getFilteredProperties(searchParams) {
  const params = new URLSearchParams();
  params.set("status", "approved");

  if (searchParams?.search) params.set("search", searchParams.search);
  if (searchParams?.propertyType)
    params.set("propertyType", searchParams.propertyType);
  if (searchParams?.minPrice) params.set("minPrice", searchParams.minPrice);
  if (searchParams?.maxPrice) params.set("maxPrice", searchParams.maxPrice);
  if (searchParams?.sort) params.set("sort", searchParams.sort);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/property?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function AllPropertiesPage({ searchParams }) {
  const params = await searchParams;
  const properties = await getFilteredProperties(params);

  const hasFilters =
    params?.search ||
    params?.propertyType ||
    params?.minPrice ||
    params?.maxPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-default-900 tracking-tight">
          All Properties
        </h1>
        <p className="text-default-500 text-sm mt-2">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"}{" "}
          {hasFilters ? "found" : "available"}
          {params?.search && ` in "${params.search}"`}
        </p>
      </div>

      {/* Filters */}
      <PropertyFilters />

      {/* Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-default-500">No properties match your search.</p>
          <p className="text-default-400 text-sm mt-1">
            Try adjusting your filters or search term.
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
}

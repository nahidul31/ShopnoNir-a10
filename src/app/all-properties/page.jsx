import { getApprovedProperties } from "@/lib/api/get-properties";
import PropertyCard from "@/ui-assets/home/all-properties-data/PropertyCard";

export default async function AllPropertiesPage() {
  const properties = await getApprovedProperties();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-default-900 tracking-tight">
          All Properties
        </h1>
        <p className="text-default-500 text-sm mt-2">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"} available
        </p>
      </div>

      {/* Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-20 text-default-500">
          No properties found.
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

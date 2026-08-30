import { Chip } from "@heroui/react";
import Link from "next/link";
import StatusSelect from "./StatusSelect";
import RejectPropertyModal from "@/ui-assets/admin/RejectPropertyModal";
// import EditPropertyModal from "@/ui-assets/admin/EditPropertyModal";
import DeletePropertyModal from "@/ui-assets/admin/DeletePropertyModal";
import EditPropertyModal from "@/ui-assets/owner-property/EditPropertyModal";

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const columns = [
  "IMAGE",
  "TITLE",
  "LOCATION",
  "TYPE",
  "RENT",
  "OWNER",
  "STATUS",
  "ACTIONS",
];

export default function AdminPropertiesTable({ properties }) {
  if (!properties?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <p>No properties found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-default-200 rounded-xl shadow-sm">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-default-100">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-semibold text-xs uppercase text-default-600 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr
              key={property._id}
              className="border-t border-default-200 hover:bg-default-50 transition-colors"
            >
              {/* IMAGE — clickable */}
              <td className="px-4 py-3">
                <Link href={`/all-properties/${property._id}`}>
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-14 h-14 object-cover rounded-lg border border-default-200 hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-default-100 text-default-400 text-xs">
                      No img
                    </div>
                  )}
                </Link>
              </td>

              {/* TITLE — clickable */}
              <td className="px-4 py-3">
                <Link
                  href={`/all-properties/${property._id}`}
                  className="block group"
                >
                  <p className="font-medium text-default-800 group-hover:text-[#A61C3C] transition-colors">
                    {property.title}
                  </p>
                  <p className="text-xs text-default-400 line-clamp-1 max-w-[200px]">
                    {property.description}
                  </p>
                </Link>
              </td>

              {/* LOCATION */}
              <td className="px-4 py-3 text-default-600">
                {property.location}
              </td>

              {/* TYPE */}
              <td className="px-4 py-3">
                <Chip variant="flat" size="sm" className="capitalize w-fit">
                  {property.propertyType}
                </Chip>
              </td>

              {/* RENT */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-semibold text-default-800">
                  ৳{property.rent}
                </span>
                <span className="text-default-400 text-xs">
                  /{property.rentType === "monthly" ? "mo" : property.rentType}
                </span>
              </td>

              {/* OWNER */}
              <td className="px-4 py-3 text-default-600">
                {property.ownerName}
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <Chip
                  color={statusColorMap[property.status] || "default"}
                  variant="flat"
                  size="sm"
                  className="capitalize w-fit"
                >
                  {property.status}
                </Chip>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <StatusSelect
                    propertyId={property._id}
                    currentStatus={property.status}
                  />

                  {/* Reject with feedback */}
                  <RejectPropertyModal property={property} />

                  {/* Update */}
                  <EditPropertyModal property={property} />

                  {/* Delete */}
                  <DeletePropertyModal property={property} />

                  <Link
                    href={`/all-properties/${property._id}`}
                    className="text-[#A61C3C] hover:text-[#8C1C2B] text-xs font-medium whitespace-nowrap hover:underline"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

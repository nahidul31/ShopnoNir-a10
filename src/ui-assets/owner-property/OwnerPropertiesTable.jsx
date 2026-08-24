"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chip, Button, Avatar, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

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

export default function OwnerPropertiesTable({ properties }) {
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();

  const handleUpdate = (id) => {
    router.push(`/dashboard/owner/properties/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  if (!properties?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <Icon icon="solar:home-2-broken" width={40} />
        <p>You haven't listed any properties yet.</p>
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
              {/* IMAGE */}
              <td className="px-4 py-3">
                {property.images?.[0] ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-14 h-14 object-cover rounded-lg border border-default-200"
                  />
                ) : (
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-default-100 text-default-400">
                    <Icon icon="solar:home-broken" width={22} />
                  </div>
                )}
              </td>

              {/* TITLE */}
              <td className="px-4 py-3">
                <p className="font-medium text-default-800">{property.title}</p>
                <p className="text-xs text-default-400 line-clamp-1 max-w-[200px]">
                  {property.description}
                </p>
              </td>

              {/* LOCATION */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 text-default-600">
                  <Icon icon="solar:map-point-broken" width={16} />
                  {property.location}
                </div>
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
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 text-default-600">
                  <Icon icon="solar:user-broken" width={16} />
                  {property.ownerName}
                </div>
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <Chip
                  color={statusColorMap[property.status] || "default"}
                  variant="flat"
                  size="sm"
                  className="capitalize flex items-center gap-1 w-fit"
                >
                  <Icon
                    icon={
                      statusIconMap[property.status] ||
                      "solar:question-circle-bold"
                    }
                    width={14}
                  />
                  {property.status}
                </Chip>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Tooltip content="Update property">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="primary"
                      onPress={() => handleUpdate(property._id)}
                    >
                      <Icon icon="solar:pen-2-broken" width={18} />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Delete property" color="danger">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      isLoading={loadingId === property._id}
                      onPress={() => handleDelete(property._id)}
                    >
                      <Icon icon="solar:trash-bin-trash-broken" width={18} />
                    </Button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Tooltip, toast } from "@heroui/react";
import { Icon } from "@iconify/react";
import Pagination from "@/ui-assets/shared/Pagination";

const columns = ["IMAGE", "PROPERTY", "LOCATION", "RENT", "ACTIONS"];

const PER_PAGE = 8;

export default function FavoritesTable({ favorites, userEmail, token }) {
  const [removingId, setRemovingId] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleRemove = async (propertyId, title) => {
    setRemovingId(propertyId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/favorites?userEmail=${userEmail}&propertyId=${propertyId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error("Failed");

      toast.success("Removed from favorites", {
        description: `"${title}" has been removed.`,
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.danger("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  if (!favorites?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <Icon icon="solar:heart-broken" width={40} />
        <p>You haven&apos;t saved any properties yet.</p>
        <Link
          href="/all-properties"
          className="text-sm text-[#A61C3C] hover:underline mt-1"
        >
          Browse properties
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(favorites.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = favorites.slice(start, start + PER_PAGE);

  return (
    <div>
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
            {visible.map((fav) => (
              <tr
                key={fav._id}
                className="border-t border-default-200 hover:bg-default-50 transition-colors"
              >
                {/* IMAGE */}
                <td className="px-4 py-3">
                  <Link href={`/all-properties/${fav.propertyId}`}>
                    {fav.propertyImage ? (
                      <img
                        src={fav.propertyImage}
                        alt={fav.propertyTitle}
                        className="w-14 h-14 object-cover rounded-lg border border-default-200 hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-default-100 text-default-400">
                        <Icon icon="solar:home-broken" width={22} />
                      </div>
                    )}
                  </Link>
                </td>

                {/* PROPERTY */}
                <td className="px-4 py-3">
                  <Link
                    href={`/all-properties/${fav.propertyId}`}
                    className="font-medium text-default-800 hover:text-[#A61C3C] transition-colors"
                  >
                    {fav.propertyTitle}
                  </Link>
                </td>

                {/* LOCATION */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-default-600">
                    <Icon icon="solar:map-point-broken" width={16} />
                    {fav.location}
                  </div>
                </td>

                {/* RENT */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-semibold text-default-800">
                    ৳{fav.rent}
                  </span>
                  <span className="text-default-400 text-xs">
                    /{fav.rentType === "monthly" ? "mo" : fav.rentType}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Tooltip content="View details">
                      <Button
                        as={Link}
                        href={`/all-properties/${fav.propertyId}`}
                        isIconOnly
                        size="sm"
                        variant="tertiary"
                      >
                        <Icon icon="solar:eye-broken" width={18} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Remove from favorites">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="danger-soft"
                        isDisabled={removingId === fav.propertyId}
                        onPress={() =>
                          handleRemove(fav.propertyId, fav.propertyTitle)
                        }
                      >
                        <Icon icon="solar:heart-broken" width={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

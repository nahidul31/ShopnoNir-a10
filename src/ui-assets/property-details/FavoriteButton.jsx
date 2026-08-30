"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, toast } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function FavoriteButton({ property, user, token }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email || !token) return;

    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/favorites/check?userEmail=${user.email}&propertyId=${property._id}`,
      { headers: { authorization: `Bearer ${token}` } },
    )
      .then((r) => (r.ok ? r.json() : { isFavorite: false }))
      .then((d) => setIsFavorite(d.isFavorite))
      .catch(console.error);
  }, [user?.email, property._id, token]);

  const handleToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/favorites?userEmail=${user.email}&propertyId=${property._id}`,
          {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed");

        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userEmail: user.email,
              propertyId: property._id,
              propertyTitle: property.title,
              propertyImage: property.images?.[0] || "",
              location: property.location,
              rent: property.rent,
              rentType: property.rentType,
            }),
          },
        );

        if (!res.ok) throw new Error("Failed");

        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (err) {
      console.error(err);
      toast.danger("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="bordered"
      size="lg"
      radius="full"
      isDisabled={loading}
      onPress={handleToggle}
      className={`w-full mt-3 font-medium ${
        isFavorite ? "border-[#A61C3C] text-[#8C1C2B]" : ""
      }`}
      startContent={
        <Icon
          icon={isFavorite ? "solar:heart-bold" : "solar:heart-broken"}
          width={18}
        />
      }
    >
      {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
    </Button>
  );
}

"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function createNewProperty(property) {
  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(property),
      cache: "no-store",
    });

    if (!res.ok) {
      const message = await res.text();
      console.error("Failed to create property:", res.status, message);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

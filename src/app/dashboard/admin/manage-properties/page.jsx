import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminPropertiesTable from "./AdminPropertiesTable";

async function getAllProperties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/property`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ManagePropertyPage() {
  const properties = await getAllProperties();

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          Manage Properties
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {properties.length}{" "}
          {properties.length === 1 ? "property" : "properties"} listed
        </p>
      </div>

      <AdminPropertiesTable properties={properties} token={tokenData?.token} />
    </div>
  );
}

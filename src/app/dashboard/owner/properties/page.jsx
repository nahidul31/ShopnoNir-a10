import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProperty } from "@/lib/api/get-properties";
import { getServerSession } from "@/lib/action/get-server-session";
import OwnerPropertiesTable from "@/ui-assets/owner-property/OwnerPropertiesTable";

export default async function OwnerPropertiesPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const ownerEmail = session?.user?.email;
  const properties = ownerEmail ? await getProperty(ownerEmail) : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        My Properties: {properties.length}
      </h1>

      <OwnerPropertiesTable properties={properties} token={tokenData?.token} />
    </div>
  );
}

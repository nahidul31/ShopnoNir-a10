import { getProperty } from "@/lib/api/get-properties";
import { getServerSession } from "@/lib/action/get-server-session";
import OwnerPropertiesTable from "@/ui-assets/owner-property/OwnerPropertiesTable";

export default async function OwnerPropertiesPage() {
  const session = await getServerSession();
  const ownerEmail = session?.user?.email;
  console.log(ownerEmail);
  const properties = ownerEmail ? await getProperty(ownerEmail) : [];
  console.log(properties);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        My Properties: {properties.length}
      </h1>
      <OwnerPropertiesTable properties={properties} />
    </div>
  );
}

import { getServerSession } from "@/lib/action/get-server-session";
import OwnerAnalytics from "@/ui-assets/dashboard/OwnerAnalytics";

export default async function OwnerDashboardPage() {
  const session = await getServerSession();
  const user = session?.user || null;

  return (
    <div className="p-6 sm:p-8">
      <OwnerAnalytics user={user} />;
    </div>
  );
}

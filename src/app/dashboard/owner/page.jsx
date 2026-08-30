import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import OwnerAnalytics from "@/ui-assets/dashboard/OwnerAnalytics";

export default async function OwnerDashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return <OwnerAnalytics user={session.user} token={tokenData?.token} />;
}

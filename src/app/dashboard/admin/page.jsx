import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import AdminAnalytics from "@/ui-assets/admin/AdminAnalytics";

export default async function AdminDashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return <AdminAnalytics token={tokenData?.token} />;
}

import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/action/get-server-session";

const DashboardMainPage = async () => {
  const session = await getServerSession();

  if (!session) redirect("/login");

  const role = session.user?.role;

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "owner") redirect("/dashboard/owner");

  redirect("/dashboard/tenant");
};

export default DashboardMainPage;

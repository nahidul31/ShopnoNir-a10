import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/action/get-server-session";

const DashboardMainPage = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) redirect("/login");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/users?email=${email}`,
    { cache: "no-store" },
  );

  const user = await res.json();

  if (user?.role === "admin") redirect("/dashboard/admin");
  if (user?.role === "owner") redirect("/dashboard/owner");

  redirect("/dashboard/tenant");
};

export default DashboardMainPage;

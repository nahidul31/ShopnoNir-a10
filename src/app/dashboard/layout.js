import DashboardSidebar from "@/ui-assets/dashboard/DashboardSidebar";
import { getServerSession } from "@/lib/action/get-server-session";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar session={session} />

      {/* sidebar (w-72) এর পাশে কনটেন্ট */}
      <div className="md:ml-72">
        {/* মোবাইলে sidebar topbar এর জন্য জায়গা */}
        <div className="pt-14 md:pt-0">{children}</div>
      </div>
    </div>
  );
}

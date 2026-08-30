import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import MyBookingsTable from "@/ui-assets/tenant/MyBookingsTable";

async function getTenantBookings(tenantEmail, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/bookings?tenantEmail=${tenantEmail}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function TenantBookingPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenData?.token;
  const tenantEmail = session?.user?.email;

  const bookings = tenantEmail
    ? await getTenantBookings(tenantEmail, token)
    : [];

  const approvedCount = bookings.filter((b) => b.status === "approved").length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          My Bookings
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
          {approvedCount > 0 && (
            <span className="text-success-600 font-medium">
              {" "}
              · {approvedCount} approved
            </span>
          )}
        </p>
      </div>

      <MyBookingsTable bookings={bookings} token={token} />
    </div>
  );
}

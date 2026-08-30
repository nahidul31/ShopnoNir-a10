import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import AdminBookingsTable from "./AdminBookingsTable";

async function getAllBookings(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bookings`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ManageBookingsPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const bookings = await getAllBookings(tokenData?.token);

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (Number(b.amount) || 0),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          All Bookings
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} · ৳
          {totalRevenue.toLocaleString()} total
        </p>
      </div>

      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

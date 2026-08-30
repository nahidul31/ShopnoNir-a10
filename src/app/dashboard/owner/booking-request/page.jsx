import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import BookingRequestsTable from "@/ui-assets/owner-property/BookingRequestsTable";

async function getOwnerBookings(ownerEmail, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/bookings?ownerEmail=${ownerEmail}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function BookingRequestsPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenData?.token;
  const ownerEmail = session?.user?.email;

  const bookings = ownerEmail ? await getOwnerBookings(ownerEmail, token) : [];

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          Booking Requests
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {bookings.length} total
          {pendingCount > 0 && (
            <span className="text-warning-600 font-medium">
              {" "}
              · {pendingCount} awaiting your response
            </span>
          )}
        </p>
      </div>

      <BookingRequestsTable bookings={bookings} token={token} />
    </div>
  );
}

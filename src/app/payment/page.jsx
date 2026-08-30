import { getServerSession } from "@/lib/action/get-server-session";
import { redirect } from "next/navigation";
import PaymentForm from "@/ui-assets/payment/PaymentForm";

async function getProperty(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/property/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PaymentPage({ searchParams }) {
  const params = await searchParams;

  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const property = params?.propertyId
    ? await getProperty(params.propertyId)
    : null;

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-semibold text-default-700">
          Property not found
        </h2>
        <p className="text-default-400 text-sm mt-1">
          Please start the booking again.
        </p>
      </div>
    );
  }

  const bookingDetails = {
    propertyId: property._id,
    propertyTitle: property.title,
    propertyImage: property.images?.[0] || "",
    location: property.location,
    rent: property.rent,
    rentType: property.rentType,
    amount: Number(property.rent),

    tenantName: user.name,
    tenantEmail: user.email,

    ownerName: property.ownerName,
    ownerEmail: property.ownerEmail,

    moveInDate: params.moveInDate || "",
    contactNumber: params.contactNumber || "",
    notes: params.notes || "",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-default-900">
          Complete your booking
        </h1>
        <p className="text-default-500 text-sm mt-2">
          Secure payment powered by Stripe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="border border-default-200 rounded-2xl p-5 sticky top-24">
            <h2 className="font-semibold text-default-800 mb-4">
              Booking Summary
            </h2>

            {property.images?.[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
            )}

            <p className="font-medium text-default-800">{property.title}</p>
            <p className="text-xs text-default-500 mt-0.5">
              {property.location}
            </p>

            <div className="mt-4 pt-4 border-t border-default-100 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-default-500">Move-in</span>
                <span className="text-default-800">
                  {params.moveInDate || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-default-500">Contact</span>
                <span className="text-default-800">
                  {params.contactNumber || "—"}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-default-100 flex justify-between items-center">
              <span className="text-default-600 font-medium">Total</span>
              <span className="text-xl font-bold text-[#8C1C2B]">
                ৳{property.rent}
              </span>
            </div>
          </div>
        </div>

        {/* Card form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <PaymentForm bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
}

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import PaymentSuccess from "@/ui-assets/payment/PaymentSuccess";

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams;

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return (
    <PaymentSuccess sessionId={params?.session_id} token={tokenData?.token} />
  );
}

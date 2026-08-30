import PaymentSuccess from "@/ui-assets/payment/PaymentSuccess";

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams;

  return <PaymentSuccess sessionId={params?.session_id} />;
}

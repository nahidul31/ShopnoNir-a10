import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import AdminTransactionsTable from "./AdminTransactionsTable";

async function getAllTransactions(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transactions`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function TransactionsPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const transactions = await getAllTransactions(tokenData?.token);

  const total = transactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          Transactions
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {transactions.length}{" "}
          {transactions.length === 1 ? "transaction" : "transactions"} · ৳
          {total.toLocaleString()} total
        </p>
      </div>

      <AdminTransactionsTable transactions={transactions} />
    </div>
  );
}

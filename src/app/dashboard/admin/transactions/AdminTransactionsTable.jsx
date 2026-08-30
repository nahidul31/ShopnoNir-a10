import Link from "next/link";

const columns = [
  "TRANSACTION ID",
  "PROPERTY",
  "TENANT",
  "OWNER",
  "AMOUNT",
  "DATE",
];

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminTransactionsTable({ transactions }) {
  if (!transactions?.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-default-400 border border-default-200 rounded-xl">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-default-200 rounded-xl shadow-sm">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-default-100">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-semibold text-xs uppercase text-default-600 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((txn) => (
            <tr
              key={txn._id}
              className="border-t border-default-200 hover:bg-default-50 transition-colors"
            >
              {/* TRANSACTION ID */}
              <td className="px-4 py-3">
                <p className="font-mono text-xs text-default-600 max-w-[180px] truncate">
                  {txn.transactionId}
                </p>
              </td>

              {/* PROPERTY — clickable */}
              <td className="px-4 py-3">
                <Link
                  href={`/all-properties/${txn.propertyId}`}
                  className="font-medium text-default-800 hover:text-[#A61C3C] transition-colors"
                >
                  {txn.propertyTitle}
                </Link>
              </td>

              {/* TENANT */}
              <td className="px-4 py-3">
                <p className="text-default-800">{txn.tenantName}</p>
                <p className="text-xs text-default-400">{txn.tenantEmail}</p>
              </td>

              {/* OWNER */}
              <td className="px-4 py-3">
                <p className="text-default-800">{txn.ownerName}</p>
                <p className="text-xs text-default-400">{txn.ownerEmail}</p>
              </td>

              {/* AMOUNT */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-semibold text-default-800">
                  ৳{txn.amount}
                </span>
              </td>

              {/* DATE */}
              <td className="px-4 py-3 text-default-600 whitespace-nowrap">
                {formatDate(txn.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

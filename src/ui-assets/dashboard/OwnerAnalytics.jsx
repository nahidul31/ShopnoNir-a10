"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SummaryCard({ icon, label, value, accent }) {
  return (
    <div className="bg-white border border-default-200 rounded-3xl p-6 shadow-sm">
      <div
        className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center mb-4`}
      >
        <Icon icon={icon} width={24} className="text-white" />
      </div>

      <p className="text-sm text-default-500">{label}</p>
      <p className="text-2xl font-bold text-default-900 mt-1">{value}</p>
    </div>
  );
}

// শেষ ১২ মাসের খালি বাকেট বানানো
function buildMonths() {
  const months = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      earnings: 0,
    });
  }

  return months;
}

export default function OwnerAnalytics({ user }) {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_URL;

        const [propRes, bookRes, txnRes] = await Promise.all([
          fetch(`${base}/api/property?ownerEmail=${user.email}`),
          fetch(`${base}/api/bookings?ownerEmail=${user.email}`),
          fetch(`${base}/api/transactions?ownerEmail=${user.email}`),
        ]);

        const [propData, bookData, txnData] = await Promise.all([
          propRes.json(),
          bookRes.json(),
          txnRes.json(),
        ]);

        setProperties(Array.isArray(propData) ? propData : []);
        setBookings(Array.isArray(bookData) ? bookData : []);
        setTransactions(Array.isArray(txnData) ? txnData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.email]);

  const totalEarnings = transactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0,
  );

  const confirmedBookings = bookings.filter(
    (b) => b.status === "approved",
  ).length;

  const chartData = (() => {
    const months = buildMonths();

    transactions.forEach((t) => {
      if (!t.date) return;

      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = months.find((m) => m.key === key);

      if (bucket) bucket.earnings += Number(t.amount) || 0;
    });

    return months;
  })();

  if (loading) {
    return <p className="text-sm text-default-400">Loading...</p>;
  }

  return (
    <div>
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-default-900">Overview</h1>
        <p className="text-default-500 text-sm mt-1">
          Your earnings and activity at a glance
        </p>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SummaryCard
          icon="solar:wallet-money-bold"
          label="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          accent="bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A]"
        />

        <SummaryCard
          icon="solar:home-2-bold"
          label="Total Properties"
          value={properties.length}
          accent="bg-gradient-to-br from-sky-500 to-sky-700"
        />

        <SummaryCard
          icon="solar:calendar-mark-bold"
          label="Total Bookings"
          value={confirmedBookings}
          accent="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
      </div>

      {/* monthly earnings chart */}
      <div className="bg-white border border-default-200 rounded-3xl p-6 shadow-sm mt-6">
        <div className="mb-6">
          <h2 className="font-semibold text-default-900">Monthly Earnings</h2>
          <p className="text-xs text-default-400 mt-1">Last 12 months</p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  `$${value.toLocaleString()}`,
                  "Earnings",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e4e4e7",
                  fontSize: "13px",
                }}
              />

              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#A61C3C"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#A61C3C" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

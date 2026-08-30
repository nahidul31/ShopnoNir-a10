import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import FavoritesTable from "@/ui-assets/tenant/FavoritesTable";

async function getFavorites(userEmail, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/favorites?userEmail=${userEmail}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function FavoritesPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenData?.token;
  const userEmail = session?.user?.email;

  const favorites = userEmail ? await getFavorites(userEmail, token) : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          My Favorites
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {favorites.length} saved{" "}
          {favorites.length === 1 ? "property" : "properties"}
        </p>
      </div>

      <FavoritesTable
        favorites={favorites}
        userEmail={userEmail}
        token={token}
      />
    </div>
  );
}

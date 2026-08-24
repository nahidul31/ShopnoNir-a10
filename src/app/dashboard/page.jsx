import { getServerSession } from "@/lib/action/get-server-session";
import React from "react";

const DashboardMainPage = async () => {
  const session = await getServerSession();

  const user = session?.user;
  return (
    <div>
      <div className="p-5">
        <h2 className="font-bold text-lg">{user?.name || "Guest"}</h2>

        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default DashboardMainPage;

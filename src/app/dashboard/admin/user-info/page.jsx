import { headers } from "next/headers";
import { Icon } from "@iconify/react";
import { Chip } from "@heroui/react";
import RoleSelect from "./RoleSelect";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";

const roleColorMap = {
  owner: "primary",
  tenant: "default",
  admin: "success",
};

async function getUsers(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ManageUsers() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenData?.token;
  const users = await getUsers(token);
  const currentUserEmail = session?.user?.email;

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Icon
          icon="solar:users-group-rounded-broken"
          width={48}
          className="text-default-300 mb-3"
        />
        <p className="text-default-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-default-900">
          Manage Users
        </h1>
        <p className="text-default-500 text-sm mt-1">
          {users.length} {users.length === 1 ? "user" : "users"} registered
        </p>
      </div>

      {/* Table */}
      <div className="border border-default-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-default-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-default-700">
                  Name
                </th>
                <th className="text-left px-6 py-4 font-semibold text-default-700">
                  Email
                </th>
                <th className="text-left px-6 py-4 font-semibold text-default-700">
                  Role
                </th>
                <th className="text-left px-6 py-4 font-semibold text-default-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isMe = user.email === currentUserEmail;

                return (
                  <tr
                    key={user._id}
                    className={`border-t border-default-100 transition-colors ${
                      isMe
                        ? "bg-primary-50/50 hover:bg-primary-50"
                        : "hover:bg-default-50"
                    }`}
                  >
                    {/* Name with avatar + Me badge */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            isMe ? "bg-primary-200" : "bg-default-200"
                          }`}
                        >
                          <span
                            className={`text-xs font-semibold ${
                              isMe ? "text-primary-800" : "text-default-700"
                            }`}
                          >
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>

                        <span className="text-default-800 font-medium">
                          {user.name}
                        </span>

                        {isMe && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                            Me
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-default-600">{user.email}</td>

                    {/* Role chip */}
                    <td className="px-6 py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={roleColorMap[user.role] || "default"}
                        className="capitalize"
                      >
                        {user.role}
                      </Chip>
                    </td>

                    {/* Role select */}
                    <td className="px-6 py-4">
                      <RoleSelect
                        userId={user._id}
                        currentRole={user.role}
                        disabled={isMe}
                        token={token}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

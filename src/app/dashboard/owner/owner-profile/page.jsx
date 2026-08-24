import { Icon } from "@iconify/react";
import { Chip } from "@heroui/react";
import { getServerSession } from "@/lib/action/get-server-session";

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function UserProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Icon
          icon="solar:user-cross-broken"
          width={48}
          className="text-default-300 mb-4"
        />
        <h2 className="text-xl font-semibold text-default-700">
          You're not logged in
        </h2>
        <p className="text-default-400 text-sm mt-1">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const { name, email, image, emailVerified, createdAt, role } = user;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="rounded-3xl overflow-hidden shadow-lg border border-default-100">
        {/* Cover banner */}
        <div
          className="h-40 sm:h-52 lg:h-60 relative"
          style={{
            background:
              "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 60%, white 0%, transparent 6%), radial-gradient(circle at 50% 90%, white 0%, transparent 10%)",
            }}
          />
        </div>

        <div className="bg-white px-6 sm:px-10 lg:px-12 pb-10 sm:pb-12">
          {/* Avatar */}
          <div className="-mt-20 sm:-mt-24 lg:-mt-28 flex justify-center sm:justify-start">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full object-cover border-[6px] border-white shadow-xl"
                />
              ) : (
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full border-[6px] border-white shadow-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #047857 100%)",
                  }}
                >
                  <span className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide">
                    {getInitials(name)}
                  </span>
                </div>
              )}
              {/* Online-style dot */}
              <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 bg-success-500 border-[4px] border-white rounded-full" />
            </div>
          </div>

          {/* Name + role */}
          <div className="mt-6 sm:mt-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-default-900">
                {name}
              </h1>
              {role && (
                <Chip
                  size="md"
                  variant="flat"
                  className="capitalize bg-success-50 text-success-700 font-medium text-sm"
                >
                  {role}
                </Chip>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-default-500 text-sm sm:text-base mt-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Icon icon="solar:letter-broken" width={18} />
                {email}
              </span>

              {emailVerified ? (
                <span className="flex items-center gap-1 text-success-600 text-xs sm:text-sm bg-success-50 px-2.5 py-1 rounded-full font-medium">
                  <Icon icon="solar:verified-check-bold" width={14} />
                  Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-warning-600 text-xs sm:text-sm bg-warning-50 px-2.5 py-1 rounded-full font-medium">
                  <Icon icon="solar:danger-triangle-bold" width={14} />
                  Not verified
                </span>
              )}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
            <div className="flex items-center gap-4 bg-default-50 hover:bg-default-100 transition-colors rounded-2xl p-5 sm:p-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-success-100 flex items-center justify-center shrink-0">
                <Icon
                  icon="solar:calendar-broken"
                  width={24}
                  className="text-success-700"
                />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-default-400">Joined</p>
                <p className="text-base sm:text-lg font-semibold text-default-800">
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-default-50 hover:bg-default-100 transition-colors rounded-2xl p-5 sm:p-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-success-100 flex items-center justify-center shrink-0">
                <Icon
                  icon="solar:shield-user-broken"
                  width={24}
                  className="text-success-700"
                />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-default-400">
                  Account Type
                </p>
                <p className="text-base sm:text-lg font-semibold text-default-800 capitalize">
                  {role || "User"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

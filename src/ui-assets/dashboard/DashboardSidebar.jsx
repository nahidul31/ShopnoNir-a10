"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Avatar } from "@heroui/react";

const NAV_CONFIG = {
  tenant: {
    label: "Tenant Dashboard",
    items: [
      {
        label: "My Bookings",
        href: "/dashboard/tenant/my-booking",
        icon: "solar:calendar-mark-bold-duotone",
      },
      {
        label: "Favorites",
        href: "/dashboard/tenant/favorites",
        icon: "solar:heart-bold-duotone",
      },
      {
        label: "Profile",
        href: "/dashboard/tenant/profile",
        icon: "solar:user-circle-bold-duotone",
      },
    ],
  },

  owner: {
    label: "Owner Dashboard",
    items: [
      {
        label: "Overview",
        href: "/dashboard/owner/overview",
        icon: "solar:widget-5-bold-duotone",
      },
      {
        label: "My Properties",
        href: "/dashboard/owner/properties",
        icon: "solar:buildings-3-bold-duotone",
      },
      {
        label: "Booking Requests",
        href: "/dashboard/owner/booking-request",
        icon: "solar:calendar-mark-bold-duotone",
      },
      {
        label: "Add Property",
        href: "/dashboard/owner/add-property",
        icon: "solar:wallet-money-bold-duotone",
      },
      {
        label: "Reviews",
        href: "/dashboard/owner/reviews",
        icon: "solar:star-bold-duotone",
      },
      {
        label: "Profile",
        href: "/dashboard/owner/owner-profile",
        icon: "solar:user-circle-bold-duotone",
      },
    ],
  },

  admin: {
    label: "Admin Dashboard",
    items: [
      {
        label: "Overview",
        href: "/dashboard/admin/overview",
        icon: "solar:widget-5-bold-duotone",
      },
      {
        label: "Manage Users",
        href: "/dashboard/admin/user-info",
        icon: "solar:users-group-rounded-bold-duotone",
      },
      {
        label: "Manage Properties",
        href: "/dashboard/admin/manage-properties",
        icon: "solar:buildings-3-bold-duotone",
      },
      {
        label: "All Bookings",
        href: "/dashboard/admin/bookings",
        icon: "solar:calendar-mark-bold-duotone",
      },
      {
        label: "Reports",
        href: "/dashboard/admin/reports",
        icon: "solar:chart-2-bold-duotone",
      },
      {
        label: "Settings",
        href: "/dashboard/admin/settings",
        icon: "solar:settings-bold-duotone",
      },
    ],
  },
};

export default function DashboardSidebar({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const user = session?.user;

  const role = user?.role || "tenant";
  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "";
  const userImage = user?.image || null;

  const config = NAV_CONFIG[role] ?? NAV_CONFIG.tenant;
  const NAV_ITEMS = config.items;
  const brandLabel = config.label;
  const brandHref = `/dashboard/${role}`;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Mobile Topbar — navbar এর নিচে */}
      <div className="fixed inset-x-0 top-16 z-20 flex items-center justify-between border-b border-[#F0DADD] bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] shadow-md shadow-[#7A1F2B]/30">
            <Icon icon="solar:home-2-bold" className="text-lg text-white" />
          </div>

          <span className="font-semibold text-slate-800">{brandLabel}</span>
        </div>

        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => setIsOpen(true)}
        >
          <Icon
            icon="solar:hamburger-menu-linear"
            className="text-2xl text-[#A61C3C]"
          />
        </Button>
      </div>

      {/* Mobile Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar — navbar এর নিচ থেকে শুরু */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-30 flex w-72 flex-col border-r border-[#F0DADD] bg-white transition-transform duration-300 ease-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6">
          <Link
            href={brandHref}
            className="flex items-center gap-2.5"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] shadow-md shadow-[#7A1F2B]/30">
              <Icon icon="solar:home-2-bold" className="text-xl text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                {brandLabel}
              </p>
              <p className="text-xs text-slate-400">Private Route</p>
            </div>
          </Link>
        </div>

        <hr className="border-[#F0DADD]" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white shadow-md shadow-[#7A1F2B]/30"
                    : "text-slate-600 hover:bg-[#FDF2F3] hover:text-[#A61C3C]"
                }`}
              >
                <Icon icon={item.icon} className="text-xl" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <hr className="border-[#F0DADD]" />

        {/* User Footer */}
        <div className="flex items-center gap-3 px-4 py-4">
          <Avatar size="sm" src={userImage || undefined} name={userName} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{userName}</p>

            <p className="truncate text-xs text-slate-500">{userEmail}</p>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
            onPress={handleLogout}
          >
            <Icon
              icon="solar:logout-3-linear"
              className="text-lg text-[#8C1C2B]"
            />
          </Button>
        </div>
      </aside>
    </>
  );
}

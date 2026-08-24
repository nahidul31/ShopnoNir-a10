"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

// Gravity UI icons — npm install @gravity-ui/icons
import {
  House,
  CopyChevronRight,
  Person,
  ArrowRightFromSquare,
  ArrowRightToSquare,
  PersonPlus,
  Bars,
  Xmark,
  ChevronDown,
  BookOpen,
  LayoutColumns3,
} from "@gravity-ui/icons";
import { Avatar, Button, Separator } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const { data: session, isPending, error, refetch } = authClient.useSession();
  const user = session?.user;

  useEffect(() => setMounted(true), []);

  // ── Required nav items ──────────────────────────────────────────────

  const NAV_LINKS = [
    { href: "/", label: "Home", Icon: House },
    {
      href: "/all-properties",
      label: "All Properties",
      Icon: CopyChevronRight,
    },
    ...(user
      ? [{ href: "/dashboard", label: "Dashboard", Icon: LayoutColumns3 }]
      : []),
  ];

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      refetch?.();
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Compute dropdown position relative to the trigger button (viewport-based, since panel uses `fixed`)
  const updateDropdownPos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }, []);

  const toggleDropdown = () => {
    if (!dropdownOpen) updateDropdownPos();
    setDropdownOpen((p) => !p);
  };

  // Reposition on scroll/resize while open, and close on outside click / Escape
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleReposition = () => updateDropdownPos();
    const handleOutsideClick = (e) => {
      if (
        panelRef.current?.contains(e.target) ||
        triggerRef.current?.contains(e.target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen, updateDropdownPos]);

  return (
    <nav className="top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-[#F0DADD] shadow-sm shadow-[#F6E3E6]">
      {/* ── Main bar ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* ── Logo + Website Name ── */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] shadow-md shadow-[#7A1F2B]/30 group-hover:scale-105 group-hover:-rotate-6 transition-all duration-200">
            <BookOpen className="w-[18px] h-[18px] text-white" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Shopno<span className="text-[#8C1C2B]">Nir</span>
          </span>
        </Link>

        <div className="flex gap-7">
          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 no-underline
                  ${
                    isActive(href)
                      ? "bg-[#FBE7EA] text-[#7A1F2B] font-semibold shadow-sm"
                      : "text-slate-500 hover:bg-[#FDF2F3] hover:text-[#A61C3C]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive(href) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A61C3C] inline-block" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-px bg-gray-500/50" />

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {user ? (
              /* ── Logged IN — Avatar + Dropdown (contains Logout) ── */
              <div className="relative hidden md:block">
                <Button
                  ref={triggerRef}
                  onPress={toggleDropdown}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 bg-white hover:border-[#A61C3C] hover:shadow-md hover:shadow-[#F3D9DE] transition-all duration-150 cursor-pointer"
                >
                  <div className="relative w-7 h-7 flex items-center">
                    {user?.image?.startsWith("https") ? (
                      <Image
                        src={user.image}
                        alt="profile"
                        fill
                        sizes="30px"
                        className="rounded-full object-cover border border-[#A61C3C]"
                      />
                    ) : (
                      <Avatar className="w-8 h-8 rounded-full border border-[#F0DADD]">
                        <Avatar.Fallback className="flex items-center justify-center w-full h-full">
                          <Person className="w-5 h-5 text-[#8C1C2B]" />
                        </Avatar.Fallback>
                      </Avatar>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-800 hidden lg:block max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </Button>

                {/* Dropdown menu — portalled to <body> so ancestor overflow-hidden
                    (e.g. hero/carousel sections on the home page) can never clip it */}
                {mounted &&
                  dropdownOpen &&
                  createPortal(
                    <div
                      ref={panelRef}
                      style={{
                        position: "fixed",
                        top: dropdownPos.top,
                        right: dropdownPos.right,
                      }}
                      className="w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 py-2 z-[999]"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 mx-1 px-3 py-2.5 text-sm text-slate-700 hover:bg-[#FDF2F3] rounded-xl transition-colors no-underline"
                      >
                        <LayoutColumns3 className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>

                      <Button
                        isDisabled={loggingOut}
                        onPress={() => {
                          setDropdownOpen(false);
                          handleLogOut();
                        }}
                        className="flex gap-2.5 w-[calc(100%-8px)] mx-1 px-3 py-2.5 text-sm text-[#8C1C2B] hover:bg-[#FBE7EA] rounded-xl transition-colors cursor-pointer border-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowRightFromSquare className="w-4 h-4" />
                        {loggingOut ? "Logging out..." : "Logout"}
                      </Button>
                    </div>,
                    document.body,
                  )}
              </div>
            ) : (
              /* ── Logged OUT — Login / Register ── */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 no-underline"
                >
                  <ArrowRightToSquare className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-sm font-semibold text-white shadow-md shadow-[#7A1F2B]/40 hover:shadow-lg hover:shadow-[#7A1F2B]/50 hover:-translate-y-0.5 transition-all duration-150 no-underline"
                >
                  <PersonPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
            <Button
              onPress={() => setMobileOpen((p) => !p)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <Xmark className="w-5 h-5" />
              ) : (
                <Bars className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#F0DADD] bg-white px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 no-underline
                ${
                  isActive(href)
                    ? "bg-[#FBE7EA] text-[#7A1F2B] font-semibold"
                    : "text-slate-600 hover:bg-[#FDF2F3] hover:text-[#A61C3C]"
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {isActive(href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#A61C3C]" />
              )}
            </Link>
          ))}

          <div className="h-px bg-slate-100 my-2" />

          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800 m-0">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400 m-0">{user.email}</p>
                </div>
              </div>

              <Button
                isDisabled={loggingOut}
                onPress={() => {
                  setMobileOpen(false);
                  handleLogOut();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#8C1C2B] hover:bg-[#FBE7EA] transition-colors cursor-pointer border-none bg-transparent w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRightFromSquare className="w-4 h-4" />
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors no-underline"
              >
                <ArrowRightToSquare className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-[#A61C3C] to-[#4A0E1A] text-sm font-semibold text-white shadow-md shadow-[#7A1F2B]/40 transition-colors no-underline"
              >
                <PersonPlus className="w-4 h-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

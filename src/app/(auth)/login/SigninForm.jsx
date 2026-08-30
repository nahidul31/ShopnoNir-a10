"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SigninForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const { email, password } = formData;

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      });

      if (error) {
        setFormError(error.message || "Invalid email or password.");
        return;
      }

      setFormData({ email: "", password: "" });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signin error:", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google signin error:", error);
      setFormError("Google sign-in failed. Please try again.");
    }
  };

  const HouseMark = ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-5.5a2 2 0 0 1 4 0V21" />
    </svg>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center border-b-4 border-[#A61C3C]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
      <div className="grid w-full min-h-screen lg:grid-cols-2 bg-white">
        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1a2236] via-[#111827] to-[#0a0f1a] lg:block">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#A61C3C]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#A61C3C]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex h-full min-h-screen flex-col justify-between p-8 xl:p-12">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A] shadow-lg shadow-[#A61C3C]/25">
                <HouseMark className="h-6 w-6" />
              </div>

              <span className="text-2xl font-extrabold">
                <span className="text-white">Shopno</span>
                <span className="text-[#E8688A]">Nir</span>
              </span>
            </Link>

            <div className="max-w-md">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
                <Icon
                  icon="solar:key-minimalistic-square-3-bold"
                  width="18"
                  className="text-[#E8688A]"
                />
                Welcome Back
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-white xl:text-5xl">
                Pick up right
                <span className="block text-[#E8688A]">
                  where you left off.
                </span>
              </h1>

              <p className="mt-5 text-base leading-7 text-gray-400">
                Sign in to manage your bookings, track your favorite properties,
                and continue exploring homes that fit your life.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                    <Icon
                      icon="solar:bookmark-square-minimalistic-bold"
                      width="19"
                      className="text-[#E8688A]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Access your saved favorites
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                    <Icon
                      icon="solar:calendar-mark-bold"
                      width="19"
                      className="text-[#E8688A]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Track bookings in real time
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A61C3C]/15">
                    <Icon
                      icon="solar:chat-round-line-bold"
                      width="19"
                      className="text-[#E8688A]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Message property owners directly
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ShopnoNir. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex w-fit items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#A61C3C] to-[#4A0E1A]">
                  <HouseMark className="h-5 w-5" />
                </div>

                <span className="text-2xl font-extrabold">
                  <span className="text-gray-900">Shopno</span>
                  <span className="text-[#A61C3C]">Nir</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your details below to continue to ShopnoNir.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon icon="solar:letter-bold" width="20" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-14 w-full rounded-lg border-2 border-gray-200 pl-12 pr-4 text-sm outline-none transition-colors hover:border-[#A61C3C]/50 focus:border-[#A61C3C]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon icon="solar:lock-password-bold" width="20" />
                  </span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="h-14 w-full rounded-lg border-2 border-gray-200 pl-12 pr-12 text-sm outline-none transition-colors hover:border-[#A61C3C]/50 focus:border-[#A61C3C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-[#A61C3C]"
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "solar:eye-closed-bold"
                          : "solar:eye-bold"
                      }
                      width="20"
                    />
                  </button>
                </div>
              </div>

              {/* Error */}
              {formError && (
                <p className="text-sm font-medium text-red-500">{formError}</p>
              )}

              {/* Remember me */}
              <label className="flex w-fit cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#A61C3C]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                radius="lg"
                isDisabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] font-bold text-white shadow-lg shadow-[#A61C3C]/25 transition-all duration-300 hover:opacity-95"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* OR */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              onPress={handleGoogleSignIn}
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full border-2 border-gray-200 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Icon icon="flat-color-icons:google" width="20" />
              Continue with Google
            </Button>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#A61C3C] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

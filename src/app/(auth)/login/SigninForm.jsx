"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";
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

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      });

      if (error) {
        setFormError(error.message || "Invalid email or password.");
        return;
      }

      console.log("Signin successful:", data);

      // Reset form
      setFormData({ email: "", password: "" });

      // Go to the home/dashboard page
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

  const inputClassNames = {
    label: "text-gray-700 font-medium",
    inputWrapper: [
      "px-4",
      "h-14",
      "border-2",
      "data-[hover=true]:border-[#C93B5B]/50",
      "group-data-[focus=true]:border-[#C93B5B]",
    ],
    input: "text-sm py-0",
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center border-b-4 border-[#C93B5B]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
      <div className="grid w-full min-h-screen lg:grid-cols-2 bg-white">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1a2236] via-[#111827] to-[#0a0f1a] lg:block">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C93B5B]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#C93B5B]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex h-full min-h-screen flex-col justify-between p-8 xl:p-12">
            <Link href="/" className="flex w-fit items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C93B5B] shadow-lg shadow-[#C93B5B]/20">
                <Icon
                  icon="solar:home-2-bold"
                  width="24"
                  className="text-white"
                />
              </div>
              <span className="text-2xl font-extrabold">
                <span className="text-white">Shopno</span>
                <span className="text-[#C93B5B]">Nir</span>
              </span>
            </Link>

            <div className="max-w-md">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
                <Icon
                  icon="solar:key-minimalistic-square-3-bold"
                  width="18"
                  className="text-[#C93B5B]"
                />
                Welcome Back
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-white xl:text-5xl">
                Pick up right
                <span className="block text-[#C93B5B]">
                  where you left off.
                </span>
              </h1>

              <p className="mt-5 text-base leading-7 text-gray-400">
                Sign in to manage your bookings, track your favorite properties,
                and continue exploring homes that fit your life.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:bookmark-square-minimalistic-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Access your saved favorites
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:calendar-mark-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Track bookings in real time
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:chat-round-line-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Message property owners directly
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HomeNest. All rights reserved.
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-lg">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex w-fit items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C93B5B]">
                  <Icon
                    icon="solar:home-2-bold"
                    width="22"
                    className="text-white"
                  />
                </div>
                <span className="text-2xl font-extrabold">
                  <span className="text-gray-900">Home</span>
                  <span className="text-[#C93B5B]">Nest</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your details below to continue to HomeNest.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================== */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Email */}
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                label="Email Address"
                placeholder="Enter your email"
                variant="bordered"
                radius="lg"
                size="lg"
                isRequired
                classNames={inputClassNames}
                startContent={
                  <Icon
                    icon="solar:letter-bold"
                    width="20"
                    className="text-gray-400 shrink-0"
                  />
                }
              />

              {/* Password */}
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                label="Password"
                placeholder="Enter your password"
                variant="bordered"
                radius="lg"
                size="lg"
                isRequired
                classNames={inputClassNames}
                startContent={
                  <Icon
                    icon="solar:lock-password-bold"
                    width="20"
                    className="text-gray-400 shrink-0"
                  />
                }
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer text-gray-400 transition-colors hover:text-[#C93B5B]"
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
                }
              />

              {/* Error */}
              {formError && (
                <p className="text-sm font-medium text-red-500">{formError}</p>
              )}

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-[#C93B5B]"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#C93B5B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                radius="lg"
                isDisabled={isSubmitting}
                className="w-full bg-[#C93B5B] font-bold text-white shadow-lg shadow-[#C93B5B]/20 transition-all duration-300 hover:bg-[#B33250]"
                endContent={<Icon icon="solar:arrow-right-bold" width="20" />}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* =================================================
                OR DIVIDER
            ================================================== */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full border-2 border-gray-200 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
              startContent={<Icon icon="flat-color-icons:google" width="20" />}
            >
              Continue with Google
            </Button>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#C93B5B] hover:underline"
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const initialFormData = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (formData.password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const { name, email, password, role } = formData;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
        role,
      });

      if (error) {
        setPasswordError(error.message || "Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", data);

      // Reset the form
      setFormData(initialFormData);

      // signUp.email auto-logs the user in — sign them back out
      await authClient.signOut();

      // Send them to the sign-in page
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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

  const roles = [
    {
      value: "tenant",
      title: "Tenant",
      subtitle: "Find a home",
      icon: "solar:home-2-bold",
    },
    {
      value: "owner",
      title: "Owner",
      subtitle: "List a property",
      icon: "solar:buildings-2-bold",
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center border-b-4 border-[#C93B5B]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
      <div className="grid w-full min-h-screen lg:grid-cols-2 bg-white">
        {/* LEFT SIDE */}
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
                  icon="solar:stars-bold"
                  width="18"
                  className="text-[#C93B5B]"
                />
                Find Your Perfect Place
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-white xl:text-5xl">
                Your next home
                <span className="block text-[#C93B5B]">starts here.</span>
              </h1>

              <p className="mt-5 text-base leading-7 text-gray-400">
                Join HomeNest and discover a simpler way to find, rent, and
                manage properties. Whether you are looking for a home or listing
                one, we have you covered.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:verified-check-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Verified property listings
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:shield-check-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Safe and secure platform
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C93B5B]/10">
                    <Icon
                      icon="solar:hand-stars-bold"
                      width="19"
                      className="text-[#C93B5B]"
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    Easy property management
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HomeNest. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
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
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Join HomeNest and start your property journey today.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              suppressHydrationWarning
            >
              {/* Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Full Name"
                  placeholder="Enter your full name"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  isRequired
                  classNames={inputClassNames}
                  startContent={
                    <Icon
                      icon="solar:user-bold"
                      width="20"
                      className="text-gray-400 shrink-0"
                    />
                  }
                />
              </div>

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

              {/* Role */}
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Choose your role
                </p>

                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  role="radiogroup"
                >
                  {roles.map(({ value, title, subtitle, icon }) => {
                    const selected = formData.role === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => handleRoleSelect(value)}
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                          selected
                            ? "border-[#C93B5B] bg-[#C93B5B]/5"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            selected ? "bg-[#C93B5B]/20" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            icon={icon}
                            width="20"
                            className={
                              selected ? "text-[#C93B5B]" : "text-gray-600"
                            }
                          />
                        </div>

                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              selected ? "text-[#C93B5B]" : "text-gray-800"
                            }`}
                          >
                            {title}
                          </p>

                          <p className="text-xs text-gray-500">{subtitle}</p>
                        </div>

                        <span
                          className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            selected
                              ? "border-[#C93B5B] bg-[#C93B5B]"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && (
                            <Icon
                              icon="solar:check-read-linear"
                              width="12"
                              className="text-white"
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  placeholder="Min. 4 characters"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  isRequired
                  minLength={4}
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

                {/* Confirm Password */}
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  isRequired
                  minLength={4}
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
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="cursor-pointer text-gray-400 transition-colors hover:text-[#C93B5B]"
                    >
                      <Icon
                        icon={
                          showConfirmPassword
                            ? "solar:eye-closed-bold"
                            : "solar:eye-bold"
                        }
                        width="20"
                      />
                    </button>
                  }
                />
              </div>

              {/* Error */}
              {passwordError && (
                <p className="text-sm font-medium text-red-500">
                  {passwordError}
                </p>
              )}

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#C93B5B]"
                />

                <span className="text-sm leading-6 text-gray-500">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#C93B5B] hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#C93B5B] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                radius="lg"
                isDisabled={isSubmitting}
                className="w-full bg-[#C93B5B] font-bold text-white shadow-lg shadow-[#C93B5B]/20 transition-all duration-300 hover:bg-[#B33250]"
                endContent={<Icon icon="solar:arrow-right-bold" width="20" />}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            {/* OR */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">OR</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Login */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#C93B5B] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

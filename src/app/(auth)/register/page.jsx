import SignupForm from "./SignupForm";

export const metadata = {
  title: "Create Account | HomeNest",
  description: "Create your HomeNest account as a tenant or property owner.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SignupForm />
    </main>
  );
}

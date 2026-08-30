import { getServerSession } from "@/lib/action/get-server-session";
import AddPropertyForm from "./AddPropertyForm";
// import AddPropertyForm from "./AddPropertyForm

export const metadata = {
  title: "Add New Property",
  description: "List a new property for rent",
};

export default async function AddPropertyPage() {
  const session = await getServerSession();

  if (!session) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  return <AddPropertyForm user={session.user} />;
}

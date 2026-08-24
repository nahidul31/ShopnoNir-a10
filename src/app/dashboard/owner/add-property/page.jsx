import AddPropertyForm from "./AddPropertyForm";

export const metadata = {
  title: "Add New Property",
  description: "List a new property for rent",
};

export default async function AddPropertyPage() {
  return <AddPropertyForm />;
}

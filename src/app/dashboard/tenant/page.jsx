import { redirect } from "next/navigation";

const TenantPage = () => {
  redirect("/dashboard/tenant/profile");
};

export default TenantPage;

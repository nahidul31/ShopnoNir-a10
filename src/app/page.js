import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/action/get-server-session";
import Banner from "@/ui-assets/home/Banner/Banner";
import BrowseByType from "@/ui-assets/home/BrowseByType";
import AllProperties from "@/ui-assets/home/all-properties-data/AllProperties";
import HowItWorks from "@/ui-assets/home/HowItWorks";
import CustomerReviews from "@/ui-assets/home/customer-review/CustomerReviews";
import SiteReviewForm from "@/ui-assets/home/site-review/SiteReviewForm";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const session = await getServerSession();
  const user = session?.user || null;

  const tokenData = session
    ? await auth.api.getToken({ headers: await headers() })
    : null;

  return (
    <div>
      <Banner />
      <AllProperties searchParams={params} />
      <BrowseByType />
      <HowItWorks />

      <CustomerReviews />

      <SiteReviewForm user={user} token={tokenData?.token} />
    </div>
  );
}

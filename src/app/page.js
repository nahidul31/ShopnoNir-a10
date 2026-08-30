// import { getServerSession } from "@/lib/action/get-server-session";
import { getServerSession } from "@/lib/action/get-server-session";
import AllProperties from "@/ui-assets/home/all-properties-data/AllProperties";
// import Banner from "@/ui-assets/home/Banner";
// import AllProperties from "@/ui-assets/home/all-properties-data/AllProperties";
import Banner from "@/ui-assets/home/Banner/Banner";
import BrowseByType from "@/ui-assets/home/BrowseByType";
import CustomerReviews from "@/ui-assets/home/customer-review/CustomerReviews";
import HowItWorks from "@/ui-assets/home/HowItWorks";
import SiteReviewForm from "@/ui-assets/home/site-review/SiteReviewForm";
// import CustomerReviews from "@/ui-assets/home/CustomerReviews";
// import SiteReviewForm from "@/ui-assets/home/SiteReviewForm";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const session = await getServerSession();
  const user = session?.user || null;

  return (
    <div>
      <Banner />

      <AllProperties searchParams={params} />
      <BrowseByType></BrowseByType>
      <CustomerReviews />
      <HowItWorks></HowItWorks>
      <SiteReviewForm user={user} />
    </div>
  );
}

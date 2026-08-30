import Image from "next/image";
import BannerSearch from "./BannerSearch";

export default function Banner() {
  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[600px] lg:h-[640px]">
      {/* Image */}
      <Image
        src="/img/banner/banner-1.jpg"
        alt="Find Your Perfect Home"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
              🏠 FIND YOUR DREAM HOME
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your
              <span className="block text-[#C93B5B]">Perfect Home</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">
              Discover beautiful homes, apartments, and premium properties in
              your favorite locations across Bangladesh.
            </p>
          </div>

          {/* Search box */}
          <BannerSearch />

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-200">
            <span>✓ Verified Properties</span>
            <span>✓ Trusted Listings</span>
            <span>✓ Easy Booking</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import { Button } from "@heroui/react";

export default function Banner() {
  return (
    <section className="w-full">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="w-full"
      >
        {/* ================= SLIDE 1 ================= */}
        <SwiperSlide>
          <div className="relative h-[400px] w-full overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[550px]">
            {/* Image */}
            <Image
              src="/img/banner/banner-1.jpg"
              alt="Find Your Perfect Home"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
                <div className="max-w-3xl">
                  {/* Small Badge */}
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
                    🏠 FIND YOUR DREAM HOME
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Find Your
                    <span className="block text-[#C93B5B]">Perfect Home</span>
                  </h1>

                  {/* Description */}
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg md:leading-8">
                    Discover beautiful homes, apartments, and premium properties
                    in your favorite locations. Search, compare, and find a
                    place that perfectly matches your lifestyle and budget.
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-[#C93B5B] px-7 font-bold text-white shadow-lg shadow-[#C93B5B]/30 transition-all hover:scale-105 hover:bg-[#B33250]"
                    >
                      Explore Properties
                    </Button>

                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-white/70 bg-white/10 px-7 font-bold text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
                    >
                      Learn More
                    </Button>
                  </div>

                  {/* Small Info */}
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-200">
                    <span>✓ Verified Properties</span>
                    <span>✓ Trusted Listings</span>
                    <span>✓ Easy Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= SLIDE 2 ================= */}
        <SwiperSlide>
          <div className="relative h-[400px] w-full overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[550px]">
            {/* Image */}
            <Image
              src="/img/banner/banner-2.jpg"
              alt="Rent Smarter Live Better"
              fill
              className="object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
                    🔑 SMART & EASY RENTING
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Rent Smarter,
                    <span className="block text-[#C93B5B]">Live Better</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg md:leading-8">
                    Looking for a comfortable place to stay? Explore a wide
                    range of affordable and modern rental properties and choose
                    the one that fits your needs without the hassle.
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-[#C93B5B] px-7 font-bold text-white shadow-lg shadow-[#C93B5B]/30 transition-all hover:scale-105 hover:bg-[#B33250]"
                    >
                      View Properties
                    </Button>

                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-white/70 bg-white/10 px-7 font-bold text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
                    >
                      Find a Rental
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-200">
                    <span>✓ Affordable Prices</span>
                    <span>✓ Prime Locations</span>
                    <span>✓ Secure Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= SLIDE 3 ================= */}
        <SwiperSlide>
          <div className="relative h-[400px] w-full overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[550px]">
            {/* Image */}
            <Image
              src="/img/banner/banner-3.jpg"
              alt="Your Next Home Is Here"
              fill
              className="object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
                    ✨ YOUR NEXT HOME AWAITS
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Your Next Home
                    <span className="block text-[#C93B5B]">Is Here</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg md:leading-8">
                    From cozy apartments to spacious family homes, discover
                    properties designed for comfortable living. Compare your
                    options and book your ideal home with confidence.
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-[#F5DDE3] px-7 font-bold text-[#7A2638] shadow-lg transition-all hover:scale-105 hover:bg-[#EBC5CF]"
                    >
                      Book Now
                    </Button>

                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-white/70 bg-white/10 px-7 font-bold text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
                    >
                      Browse Homes
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-200">
                    <span>✓ Easy Search</span>
                    <span>✓ Verified Homes</span>
                    <span>✓ Quick Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

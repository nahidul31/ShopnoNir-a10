import Link from "next/link";
import { Icon } from "@iconify/react";

const TYPES = [
  {
    key: "apartment",
    label: "Apartments",
    icon: "solar:buildings-2-bold-duotone",
    blurb: "City living, ready to move in",
    fallback:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    span: "col-span-2 lg:col-span-2 lg:row-span-2",
    height: "min-h-[260px] lg:min-h-[420px]",
    big: true,
  },
  {
    key: "house",
    label: "Houses",
    icon: "solar:home-smile-bold-duotone",
    blurb: "Space for the whole family",
    fallback:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    span: "col-span-2",
    height: "min-h-[200px]",
  },
  {
    key: "villa",
    label: "Villas",
    icon: "solar:home-add-bold-duotone",
    blurb: "Premium comfort",
    fallback:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80",
    span: "col-span-1",
    height: "min-h-[200px]",
  },
  {
    key: "room",
    label: "Rooms",
    icon: "solar:bed-bold-duotone",
    blurb: "Budget-friendly",
    fallback:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
    span: "col-span-1",
    height: "min-h-[200px]",
  },
  {
    key: "studio",
    label: "Studios",
    icon: "solar:sofa-2-bold-duotone",
    blurb: "Compact spaces for one",
    fallback:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    span: "col-span-2",
    height: "min-h-[200px]",
  },
  {
    key: "office",
    label: "Offices",
    icon: "solar:case-round-bold-duotone",
    blurb: "Workspaces for your business",
    fallback:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    span: "col-span-2",
    height: "min-h-[200px]",
  },
];

async function getProperties() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/property?status=approved`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function BrowseByType() {
  const properties = await getProperties();

  const forType = (type) => properties.filter((p) => p.propertyType === type);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Heading */}
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-[#A61C3C] bg-[#FBE7EA] rounded-full px-3 py-1.5">
            <Icon icon="solar:widget-4-bold" width={14} />
            Categories
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-default-900 mt-4 leading-tight">
            Browse by
            <span className="block text-[#A61C3C]">property type</span>
          </h2>
        </div>

        <Link
          href="/all-properties"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-default-700 hover:text-[#A61C3C] transition-colors"
        >
          View all listings
          <span className="w-8 h-8 rounded-full border border-default-300 flex items-center justify-center group-hover:border-[#A61C3C] group-hover:bg-[#A61C3C] transition-all">
            <Icon
              icon="solar:arrow-right-linear"
              width={16}
              className="group-hover:text-white transition-colors"
            />
          </span>
        </Link>
      </div>

      {/* Mosaic */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        {TYPES.map((type) => {
          const items = forType(type.key);
          const count = items.length;

          const cover =
            items.find((p) => p.images?.[0])?.images?.[0] || type.fallback;

          return (
            <Link
              key={type.key}
              href={`/all-properties?propertyType=${type.key}`}
              className={`group relative overflow-hidden rounded-[26px] ${type.span} ${type.height} flex flex-col justify-end p-5 sm:p-6`}
            >
              {/* background image */}
              {cover ? (
                <img
                  src={cover}
                  alt={type.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(145deg, #A61C3C 0%, #7A1F2B 55%, #4A0E1A 100%)",
                  }}
                />
              )}

              {/* dark wash so text stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* brand tint on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* count badge */}
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5">
                <Icon icon={type.icon} width={14} />
                {count} {count === 1 ? "listing" : "listings"}
              </span>

              {/* arrow */}
              <span className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Icon
                  icon="solar:arrow-right-up-linear"
                  width={17}
                  className="text-white"
                />
              </span>

              {/* label */}
              <div className="relative">
                {type.big && (
                  <p className="text-white/60 text-xs font-medium tracking-wide uppercase mb-1">
                    Most searched
                  </p>
                )}

                <h3
                  className={`font-bold text-white ${
                    type.big ? "text-2xl sm:text-3xl" : "text-lg"
                  }`}
                >
                  {type.label}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
                  {type.blurb}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

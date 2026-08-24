// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Or restrict to specific domains like 'avatars.githubusercontent.com'
      },
    ],
  },
};
export default nextConfig;

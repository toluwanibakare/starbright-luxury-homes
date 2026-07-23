/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.starbrightproperties.com.ng" },
      { protocol: "https", hostname: "starbrightproperties.com.ng" },
    ],
  },
};

export default nextConfig;

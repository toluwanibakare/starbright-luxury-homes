/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.starbrightproperties.com.ng" },
      { protocol: "https", hostname: "starbrightproperties.com.ng" },
    ],
  },
};

export default nextConfig;

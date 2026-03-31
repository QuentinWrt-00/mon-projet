import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.diptyqueparis.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;

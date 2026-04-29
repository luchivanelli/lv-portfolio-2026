import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio-lvanelli.vercel.app",
      },
    ],
  },
};

export default nextConfig;
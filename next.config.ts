import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.E2E_TEST && {
    output: "standalone",
  }),
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;

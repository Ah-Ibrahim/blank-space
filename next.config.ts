import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "/81x7bxjzv9vfgy96/publicFiles/**",
      },
    ],
  },
};

export default nextConfig;

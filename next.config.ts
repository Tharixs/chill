import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "img.youtube.com",
      },
      {
        hostname: "i9.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "www.figma.com" },
      { hostname: "lh7-rt.googleusercontent.com" },
    ],
    qualities: [100, 75],
  },
};

export default nextConfig;

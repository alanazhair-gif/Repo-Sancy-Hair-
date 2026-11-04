import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // 90 keeps the large hero photo crisp; 75 stays the default elsewhere.
    qualities: [75, 90],
  },
};

export default nextConfig;

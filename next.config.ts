// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_BASE_API_STRAPI}`,
        // port: "3000",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_BASE_API}`,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.goldenheightfoundation.org",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

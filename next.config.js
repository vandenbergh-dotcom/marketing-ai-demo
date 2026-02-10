/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only proxy to backend in development
    if (process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_DEMO_MODE) {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;

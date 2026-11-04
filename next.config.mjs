/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/docs", destination: "/docs/overview", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/docs/:path((?!.*\\.).*)", destination: "/docs/:path/index.html" },
    ];
  },
};

export default nextConfig;

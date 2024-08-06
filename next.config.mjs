/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: ["img.icons8.com", "img.freepik.com"],
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://forecast-genius.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};

export default nextConfig;

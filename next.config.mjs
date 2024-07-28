/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ hostname: "amrdiab.net", protocol: "https" }],
  },
};

export default nextConfig;

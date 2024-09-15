/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
        protocol: "https"
      },
    ],
  },
};

export default nextConfig;

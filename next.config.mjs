/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // أو "SAMEORIGIN" إذا الإثنين بنفس السيرفر
          },
        ],
      },
    ];
  },
};

export default nextConfig;

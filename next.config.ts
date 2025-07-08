import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tắt ESLint khi build
  },
};

export default nextConfig;

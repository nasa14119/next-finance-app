/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve("frontend/src/components"),
      "@context": path.resolve("frontend/src/context"),
      "@home": path.resolve("frontend/src/components/app"),
      "@assets": path.resolve("frontend/src/assets"),
      "src": path.resolve("frontend/src"),
    };
    return config;
  },
};

export default nextConfig;

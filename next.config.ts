import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler is stable in Next.js 16 (auto-memoization via babel-plugin-react-compiler).
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Local Supabase Storage during development.
      { protocol: "http", hostname: "127.0.0.1", port: "54321" },
    ],
  },
};

export default nextConfig;

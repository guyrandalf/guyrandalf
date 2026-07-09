import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler is stable in Next.js 16 (auto-memoization via babel-plugin-react-compiler).
  reactCompiler: true,
  images: {
    // Allow local IPs only outside production (local Supabase Storage on 127.0.0.1).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      // Local Supabase Storage during development.
      { protocol: "http", hostname: "127.0.0.1", port: "54321" },
      // Supabase Storage in production (any project ref).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fără asta, Turbopack urcă până la un package-lock.json din afara repo-ului.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

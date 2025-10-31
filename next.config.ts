import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = config.resolve.alias ?? {};
    config.resolve.alias["@"] = path.resolve(here, ".");
    return config;
  },
};

export default nextConfig;

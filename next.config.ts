import type { NextConfig } from "next";

// Compute basePath from env (set in CI for GitHub Pages). For user/org pages, leave empty.
const rawBasePath = process.env.BASE_PATH;
const basePath = rawBasePath && rawBasePath !== "/" ? rawBasePath : "";

const nextConfig: NextConfig = {
  // Enable static HTML export for GitHub Pages
  output: "export",
  // When deploying to project pages (e.g., /<repo>), set BASE_PATH=/<repo>
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // Required for static export
    unoptimized: true,
  },
  // Generate folder-based routes (avoids some GH Pages hosting edge cases)
  trailingSlash: true,
};

export default nextConfig;

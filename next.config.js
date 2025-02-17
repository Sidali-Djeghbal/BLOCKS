/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export", // This enables static export
  distDir: "out", // Output directory
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't support Next.js image optimization
  },
  basePath: isProd ? "/your-repo-name" : "", // Adjust for GitHub Pages
  assetPrefix: isProd ? "/your-repo-name/" : "", // Adjust for GitHub Pages
};

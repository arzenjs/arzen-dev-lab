/** @type {import('next').NextConfig} */
const nextConfig = {
  // The calculator is a fully static app: Next.js prerenders it to plain
  // HTML/CSS/JS in `out/` during `next build`. scripts/move-export.mjs then
  // moves the export to `dist/` as this project's build artifact.
  output: "export",
};

export default nextConfig;

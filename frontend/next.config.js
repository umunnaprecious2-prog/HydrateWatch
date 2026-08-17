/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a minimal, self-contained server build for the Docker image
  // (see frontend/Dockerfile).
  output: "standalone",
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Every route in this app is already static (no route handlers, middleware,
  // dynamic segments, or next/image) - export pure static HTML/CSS/JS instead
  // of running a Node server. This is what lets the site be hosted as a
  // Render Static Site (CDN-served, always-on) instead of a Web Service
  // (which spins down after 15 min idle and costs ~30-60s to wake back up).
  output: "export",
  // Export as about/index.html instead of about.html - the conventional
  // structure static hosts (Render Static Sites included) expect for
  // serving clean URLs without needing custom rewrite rules.
  trailingSlash: true,
}

module.exports = nextConfig

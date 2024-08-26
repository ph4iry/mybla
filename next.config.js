const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // add externals
    config.externals = config.externals || [];
    config.externals.push(
      // "bla-aspen",
      "puppeteer",
      "puppeteer-core",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth"
    );

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      // "bla-aspen",
      "puppeteer",
      "puppeteer-core",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
    ],
  }
}
 
module.exports = withMDX(nextConfig);
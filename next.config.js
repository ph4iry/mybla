const withMDX = require('@next/mdx')() 

const environment = () => {
  const heroku = false;

  let server_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3030"
      : "https://mybla-server-30f658414629.herokuapp.com";

  return heroku || server_url ? "https://mybla-server-30f658414629.herokuapp.com" : server_url;
}

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
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${environment()}/api/:path*`,
        },
      ],
    }
  },
}
 
module.exports = withMDX(nextConfig);
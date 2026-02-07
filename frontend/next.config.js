/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/Personal_Notes-and-Bookmanager',
  assetPrefix: '/Personal_Notes-and-Bookmanager/',
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // penting untuk static export
  },
};

module.exports = nextConfig;

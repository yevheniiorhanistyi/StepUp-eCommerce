import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.cdn.europe-west1.gcp.commercetools.com'
      }
    ]
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hey-cake.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

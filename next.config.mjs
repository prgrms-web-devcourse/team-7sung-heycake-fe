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
      {
        protocol: 'https',
        hostname: 'hey-cake.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;

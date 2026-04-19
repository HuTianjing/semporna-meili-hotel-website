import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// 将 i18n 注入路由配置核心
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'loremflickr.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      { protocol: 'https', hostname: 'mgx-backend-cdn.metadl.com' }, // v19 图片/视频 CDN
    ],
  },
};

export default withNextIntl(nextConfig);

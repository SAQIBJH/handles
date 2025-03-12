/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: () => [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store',
            },
          ],
        },
      ],
      images: {
        domains: ['test.handles-more.com'],
      },
};

export default nextConfig;

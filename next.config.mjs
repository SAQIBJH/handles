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
        domains: ['musing-nobel.97-74-95-14.plesk.page'],
      },
};

export default nextConfig;

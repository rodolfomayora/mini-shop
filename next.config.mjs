/** @type {import('next').NextConfig} */
export default {
  pageExtensions: ['page.ts', 'page.tsx'],
  
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

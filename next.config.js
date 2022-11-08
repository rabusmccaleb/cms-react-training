/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.annihil.us'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/u/prod/marvel/i/mg/f/20/**',
      },
    ],
  },
}
// http://i.annihil.us

// "http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0"
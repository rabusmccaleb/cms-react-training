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
  env: {
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    BASE_MARVEL_API : process.env.BASE_MARVEL_API,
  }
}
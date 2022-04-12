/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL
  },
  serverRuntimeConfig: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    IS_PROD: process.env.NODE_ENV === 'production'
  },
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    dirs: ['src']
  }
};

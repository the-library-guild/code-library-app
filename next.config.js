/** @type {import('next').NextConfig} */

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!graphqlUrl) {
  throw Error('Please defined NEXT_PUBLIC_GRAPHQL_URL.');
}

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
if (!clientUrl) {
  throw Error('Please defined NEXT_PUBLIC_CLIENT_URL.');
}

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_CLIENT_URL: clientUrl,
    NEXT_PUBLIC_GRAPHQL_URL: graphqlUrl,
  },
  serverRuntimeConfig: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    IS_PROD: process.env.NODE_ENV === 'production',
  },
  experimental: {
    outputStandalone: true,
  },
  eslint: {
    dirs: ['src'],
  },
};

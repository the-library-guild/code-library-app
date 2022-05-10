/** @type {import('next').NextConfig} */

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const isNotTestEnvironemtn = process.env.NODE_ENV !== 'test';

if ((clientUrl === null || clientUrl === undefined) && isNotTestEnvironemtn) {
  throw Error('Required variable NEXT_PUBLIC_CLIENT_URL was not defined');
}

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLIENT_URL: clientUrl,
    NEXT_PUBLIC_GRAPHQL_URL: `${clientUrl}/api/graphql`,
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

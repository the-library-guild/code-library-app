/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: "http://localhost:4000/graphql/",
    CLIENT_URL: "http://localhost:3000/",
  },
};
module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: isProd
      ? "https://code-library-api.herokuapp.com/graphql/"
      : "http://localhost:4000/graphql/",
    CLIENT_URL: isProd
      ? "https://code-library-client.herokuapp.com"
      : "http://localhost:3000/",
  },
};
module.exports = nextConfig;

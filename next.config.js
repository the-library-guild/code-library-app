/** @type {import('next').NextConfig} */

const envMode = process.env.NODE_ENV || "development";
const capitalizedEnvMode = envMode.charAt(0).toUpperCase() + envMode.slice(1);

const log = (arg) => console.info(`[Client] ${arg}`);

log(`Available on ${process.env.NEXT_PUBLIC_CLIENT_URL} in ${capitalizedEnvMode} Mode`);
log(`GraphQl Url: ${process.env.NEXT_PUBLIC_GRAPHQL_URL}`);
log(`Auth Url: ${process.env.NEXTAUTH_URL}`);

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  },
  experimental: {
    outputStandalone: true,
  },
};

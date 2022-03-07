/** @type {import('next').NextConfig} */

const envMode = process.env.NODE_ENV || "development";
const runningWithinDockerContainer = process.env.APP_ENV === "docker";
const capitalizedEnvMode = envMode.charAt(0).toUpperCase() + envMode.slice(1);

const log = (arg) => console.info(`[Client] ${arg}`);

log(`Available on ${process.env.CLIENT_URL} in ${capitalizedEnvMode} Mode`);
log(`GraphQl Url: ${process.env.GRAPHQL_URL}`);
log(`Auth Url: ${process.env.NEXTAUTH_URL}`);

module.exports = {
  reactStrictMode: true,
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    CLIENT_URL: process.env.CLIENT_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    GRAPHQL_URL: runningWithinDockerContainer
      ? "http://api:4000/graphql/"
      : process.env.GRAPHQL_URL,
  },
  publicRuntimeConfig: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
};

/** @type {import('next').NextConfig} */

const envMode = process.env.NODE_ENV || "development";
const capitalizedEnvMode = envMode.charAt(0).toUpperCase() + envMode.slice(1);

const log = (arg) => console.info(`[Client] ${arg}`);

const getEnvVarOrDie = value => {
  if (process.env[value] == null) {
    throw new Error(
      `Environment variable ${value} is not set`
    )
  }
  return process.env[value];
}

const clientUrl = getEnvVarOrDie('NEXT_PUBLIC_CLIENT_URL');
const graphqlUrl = getEnvVarOrDie('NEXT_PUBLIC_GRAPHQL_URL');
const nextauthUrl = getEnvVarOrDie('NEXTAUTH_URL');

log(`Available on ${clientUrl} in ${capitalizedEnvMode} Mode`);
log(`GraphQl Url: ${graphqlUrl}`);
log(`Auth Url: ${nextauthUrl}`);

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GRAPHQL_URL: graphqlUrl,
    NEXT_PUBLIC_CLIENT_URL: clientUrl,
  },
  experimental: {
    outputStandalone: true,
  },
};

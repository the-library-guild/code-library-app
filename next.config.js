/** @type {import('next').NextConfig} */

const { assert } = require('console');

const envMode = process.env.NODE_ENV || "development";
const capitalizedEnvMode = envMode.charAt(0).toUpperCase() + envMode.slice(1);

const log = (arg) => console.info(`[Client] ${arg}`);

const assertVariableIsSet = value => {
  if (process.env[value] == null) {
    throw new Error(
      `Environment variable ${value} is not set`
    );
  }
}

const getEnvVarOrDie = value => {
  assertVariableIsSet(value);

  return process.env[value];
}

const requiredVariables = [
 'MAX_SESSION_DURATION_SECONDS',
 'JWT_SECRET',
 'NEXTAUTH_SECRET',
 'GOOGLE_ID',
 'GOOGLE_SECRET',
];

requiredVariables.map(value => assertVariableIsSet(value));

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

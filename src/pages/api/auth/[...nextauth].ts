import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { gql } from '@apollo/client';

import { apiClient } from '../../../services/apollo-client';
import { signToken, verifyToken } from '../../../token';

const sessionMaxAgeInSeconds = parseInt(
  process.env.MAX_SESSION_DURATION_SECONDS
);

const secret = process.env.JWT_SECRET;

const GET_USER = gql`
  query GetUserData($userData: Jwt!, $secret: String!) {
    mintJwt(userData: $userData, secret: $secret)
  }
`;

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Error code is passed in as a query string i.e., ?error=Callaback
  },
  session: {
    strategy: 'jwt',
    maxAge: sessionMaxAgeInSeconds,
  },
  jwt: {
    /*
    next-auth is using non-standart jwts, which libraries like jsonwebtoken are to my knowledge unable to decode.
    since we are not using next-auth on the graphql backend, but still need to decode the jwts there,
    we are going with a 💫 custom 💫 implementation using jsonwebtoken.
    this is thankfully supported by next-auth.
    */
    encode: async ({ token }) => {
      if (token == null) return '';

      // the first token created after sign in only contains one key called state
      if (token.state) return signToken(token);

      const { name, email, picture } = token;
      const userData = { name, email, picture };

      const { data, error } = await apiClient.query({
        query: GET_USER,
        variables: {
          userData,
          secret,
        },
      });

      return error ? '' : data.mintJwt;
    },
    decode: ({ token }) => verifyToken(token),
  },
  callbacks: {
    session: async ({ session, token }) => {
      const { permsInt, rentingLimit, exp, iat } = token;

      session.user = { ...session.user, permsInt, rentingLimit, exp, iat };

      return session;
    },
  },
});

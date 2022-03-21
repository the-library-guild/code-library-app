FROM node:16 as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx next build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_TLS_REJECT_UNAUTHORIZED 1
ENV NEXT_PUBLIC_CLIENT_URL https://code-library-client-swguw3y6sa-ey.a.run.app
ENV NEXT_PUBLIC_GRAPHQL_URL https://code-library-api.herokuapp.com/graphql/

RUN npm run build

FROM node:16-slim as production

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_CLIENT_URL https://code-library-client-swguw3y6sa-ey.a.run.app
ENV NEXT_PUBLIC_GRAPHQL_URL https://code-library-api.herokuapp.com/graphql/

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]

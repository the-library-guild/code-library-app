FROM node:16 as development

ARG NEXT_PUBLIC_CLIENT_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx next build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM node:16-alpine AS builder

ARG NEXT_PUBLIC_CLIENT_URL https://bhzmipgrc2.eu-west-1.awsapprunner.com

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_TLS_REJECT_UNAUTHORIZED 1
ENV NEXT_PUBLIC_CLIENT_URL=${NEXT_PUBLIC_CLIENT_URL}

RUN npm run build

FROM node:16-slim as production

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

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

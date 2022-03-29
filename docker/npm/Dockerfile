FROM node:16-alpine

WORKDIR /app

VOLUME [ "/app/node_modules", "/app/.next" ]

COPY package*.json ./

ENTRYPOINT [ "npm" ]

CMD [ "--help" ]

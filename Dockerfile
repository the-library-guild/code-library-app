FROM node:16

WORKDIR /app/src

COPY package*.json ./

COPY . .

RUN npm install

RUN npx next build

EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:16

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npx next build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

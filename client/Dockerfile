FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --f

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

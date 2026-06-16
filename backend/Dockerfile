FROM node:slim
WORKDIR /app

COPY package*.json /app/
RUN npm i

COPY . .

RUN npx prisma init

FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install

FROM node:16 as base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

RUN  npm test

EXPOSE 8080

CMD npm start




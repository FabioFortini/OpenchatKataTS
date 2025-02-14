FROM node:22.13-alpine as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prisma generate
RUN npm run build:ts

FROM node:22.13-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

CMD [ "npm", "start" ]

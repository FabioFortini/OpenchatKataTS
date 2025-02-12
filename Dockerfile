FROM node:22.13-alpine as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run generate-database-client
RUN npm run build

FROM node:22.13-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

CMD [ "npm", "start" ]

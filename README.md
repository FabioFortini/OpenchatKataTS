# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Run locally with docker

If you don't want to re-build the application docker image you can omit the `--build` flag.

```
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run locally in dev mode

To run locally the application without docker we still need a postgres database.
We can run it directly from our docker-compose before starting the app.

```
docker-compose up postgres -d
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run tests

```
npm run test
```

If you want to run tests with coverage run:

```
npm run coverage
```

## Format the codebase

If you want to format the whole project manually.

```
npm run format
```

We are using Prettier to format our code.
The configuration is available in `.prettierrc` file.

To setup prettier in you IDE follow the instructions [here](https://prettier.io/docs/en/editors.html)

## Database integration

We are using [Prisma](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction) as our ORM to interact with the postgres database.
We are using it also to handle schema migrations.

### Update autogenerated prisma client

Since it is a autogenerated code we provided a command to update our local copy of the generated code easily.

```
npm run prisma generate
```

### Create a new migration

If you have changed the `schema.prisma`, you need to run this command to generate a migration.
The migration, once the application is released, will also be applied to the production database.

```
npm run prisma migrate dev
```

This command needs a local database updated to the latest migration to work correctly.
(you can run: `docker-compose up postgres -d`)

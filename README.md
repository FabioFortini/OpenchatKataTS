# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run format`

If you want to format the whole project with prettier manually.

### `npm run prisma`

Run Prisma command. Through this command it is possible to:
- Generate the Prisma client code (`npm run prisma generate`)
- Generate a migration file from differences between the schema 

  and the local database (`npm run prisma migrate dev`)
- Migrate the database schema (`npm run prisma migrate deploy`)


## Code Formatting

We are using Prettier to format our code.
The configuration is available in `.prettierrc` file.

To setup prettier in you IDE follow the instructions [here](https://prettier.io/docs/en/editors.html)

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

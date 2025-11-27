<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="96" alt="NestJS logo" />
</p>

# WeRent Backend

Lightweight NestJS + Prisma service that powers the WeRent product reviews experience.  
It exposes a simple HTTP API (soon to be expanded) backed by PostgreSQL and provides scripts to manage schema migrations, seed curated sample data, and run automated tests.

## Tech Stack

- NestJS 11 with Express adapter
- Prisma 7 + PostgreSQL via `@prisma/adapter-pg`
- pnpm for dependency management
- Jest + Supertest for automated testing

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`corepack enable` is recommended)
- A PostgreSQL database (local Docker container or managed instance)

## Configuration

Create a `.env` file in the project root that defines at least the connection string used by Prisma:

```
DATABASE_URL="postgresql://user:password@localhost:5432/werent?schema=public"
```

The Prisma client is configured in `prisma/lib/prisma.ts` and automatically picks up this value.

## Getting Started

```bash
# install dependencies
pnpm install

# generate Prisma client (if you change the schema)
pnpm exec prisma generate

# apply database migrations
pnpm exec prisma migrate deploy

# run the API
pnpm start:dev
```

The service boots on `http://localhost:3000`. The default `GET /` route returns a simple health message so you can verify the server is running.

## Database Tasks

```bash
# create a new migration
pnpm exec prisma migrate dev --name <migration_name>

# push schema changes without generating SQL (prototype mode)
pnpm exec prisma db push

# populate the Review table with sample entries
pnpm run db:seed
```

Review records live in `prisma/schema.prisma` and are used to showcase average size/fit data inside the WeRent UI.

## NPM Scripts

```bash
pnpm start          # production build (needs dist/)
pnpm start:dev      # watch mode with ts-node
pnpm start:prod     # run compiled dist
pnpm test           # unit tests
pnpm test:e2e       # e2e tests in ./test
pnpm test:cov       # coverage report
pnpm lint           # eslint with --fix
pnpm format         # prettier on src/ and test/
```

## Project Structure

- `src/` – NestJS modules, controllers, and services. The `prisma` module manages the shared Prisma client lifecycle.
- `prisma/` – Prisma schema, migrations, and the seeding script.
- `generated/` – Type-safe Prisma client output (committed for CI reproducibility).
- `test/` – Jest e2e setup (`supertest` against the compiled app).

## Testing

1. Ensure the database described by `DATABASE_URL` is reachable.
2. Run `pnpm test` for unit tests or `pnpm test:e2e` for end-to-end specs.
3. View coverage details with `pnpm test:cov`.

## Deployment Notes

- Use `pnpm build` to emit TypeScript into `dist/`.
- Provide the same environment variables (`DATABASE_URL`, etc.) in your hosting platform.
- Run `pnpm start:prod` (or `node dist/main`) behind a process manager such as PM2 or a container orchestrator.

## License

This repository is currently distributed under the terms defined in `LICENSE`.

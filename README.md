# Hono Legal

Hono Legal is an internal legal fee management system for a law firm. The product replaces spreadsheet-based control of clients, contracts, revenues, fees, and employee remunerations with a typed web application focused on auditability, role-aware financial visibility, and automated remuneration calculations.

The user interface is intended to remain in pt-BR while the codebase stays in English.

## Current Implementation

This repository is a Next.js App Router application built with the T3 Stack style:

- Next.js 15, React 19, and TypeScript
- tRPC 11 with TanStack Query
- Drizzle ORM with PostgreSQL
- Tailwind CSS 4 and shadcn-style Radix UI components
- React Hook Form and Zod for forms and validation
- Biome for formatting and linting
- Sonner for notifications
- Zustand and nuqs for local UI/query state

Implemented application areas currently include:

- Clients (`/clientes`)
- Employees (`/funcionarios`)
- Contracts (`/contratos`)
- Fees (`/honorarios`)
- Remunerations (`/remuneracoes`)

The source follows a feature-based layout under `src/features`, with shared UI, hooks, schemas, constants, and types under `src/shared`.

## Planned Product Scope

The product requirements in `PRD.xml` and `docs/domain/PRODUCT_SENSE.md` define the broader target state:

- Authentication with email or OAB login
- Role-based access for admins and regular users
- Dashboard and analytics
- Client, employee, contract, revenue, fee, and remuneration management
- Automated remuneration generation from fee events
- Audit logs for business changes
- Report exports
- Desktop-first workflows with basic mobile support

The current codebase already contains database schema and tRPC router foundations for the core domain, but authentication, full dashboard analytics, audit UI, export flows, and some advanced business automation remain planned work.

## Domain Model

Core entities:

- `Employee`: lawyer or administrative assistant, with role and remuneration percentages
- `Client`: individual or company client
- `Contract`: legal case/process connected to a client
- `ContractEmployee`: assignment of employees to contracts
- `Revenue`: payment structure for a contract
- `Fee`: actual client payment event
- `Remuneration`: calculated employee payment connected to a fee
- `AuditLog`: planned history of important business changes

Business hierarchy:

```text
Contract
  -> Revenue
    -> Fee
      -> Remuneration
```

## Project Structure

```text
src/
  app/                 Next.js App Router pages and API routes
  features/            Feature modules for domain screens
  server/              tRPC routers and Drizzle database code
  shared/              Shared components, hooks, schemas, constants, and types
  styles/              Global styles
  trpc/                Client/server tRPC helpers
```

Feature modules generally follow this shape:

```text
src/features/{entity}/
  components/
    detail/
    filter/
    form/
    table/
  hooks/
  parsers/
  schemas/
  stores/
  utils/
  index.tsx
```

## Requirements

- Node.js
- pnpm
- PostgreSQL database

## Environment

Create a local `.env` file with at least:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/hono_db"
```

Environment variables are validated in `src/env.js`. Set `SKIP_ENV_VALIDATION=1` only when intentionally bypassing validation for cases like container builds.

## Setup

Install dependencies:

```bash
pnpm install
```

Generate or apply database migrations as needed:

```bash
pnpm db:generate
pnpm db:migrate
```

For local schema sync during development:

```bash
pnpm db:push
```

## Development

Run the development server:

```bash
pnpm dev
```

The app runs on `http://localhost:3000` by default.

## Quality Checks

Run Biome checks:

```bash
pnpm check
```

Run TypeScript checks:

```bash
pnpm typecheck
```

Build for production:

```bash
pnpm build
```

Start the production build:

```bash
pnpm start
```

## Database Commands

```bash
pnpm db:generate   # generate Drizzle migrations
pnpm db:migrate    # apply migrations
pnpm db:push       # push schema changes directly
pnpm db:studio     # open Drizzle Studio
```

## Development Conventions

- Keep changes small and localized.
- Preserve type safety; do not introduce `any`.
- Keep user-facing labels and validation messages in pt-BR.
- Prefer existing feature patterns before adding new abstractions.
- Add shared code only when it removes real duplication.
- Use Drizzle schema and typed tRPC routers as the source of backend contracts.
- Run `pnpm check` and `pnpm typecheck` before handing off larger changes.

## Reference Documents

- `PRD.xml`: planned product requirements and technical target state
- `TODO.xml`: prioritized implementation backlog
- `C:/Dev/hono-start/docs/domain/PRODUCT_SENSE.md`: domain guardrails and product invariants
- `AGENTS.md`: local development instructions for coding agents

# CLAUDE.md

## Project Overview

This is a Next.js web application built with the T3 Stack. It uses TypeScript, tRPC for end-to-end typesafe APIs, Drizzle ORM for database access, and Tailwind CSS for styling. The project is configured with Biome for code formatting and linting.

The application appears to be a business management tool with features for managing clients, contracts, employees, fees, and remunerations.

## Rules

1. Please every step of the way just give me a high level explanation of what changes you made
2. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
3. Finally, add a review section to the TODO.md file with a summary of the changes you made and any other relevant information.
4. Always use Context7 MCP server for updated library documentation and implementation patterns
5. Always read TODO.xml for the current state of the project
6. Always read PRD.xml for the planned state of the project
7. Never uses "any" type anywhere in the codebase

## Building and Running

### Prerequisites

- Node.js and pnpm

### Installation

```bash
pnpm install
```

### Development

To run the development server:

```bash
pnpm dev
```

### Building

To build the application for production:

```bash
pnpm build
```

### Other Scripts

- `pnpm check`: Run Biome to check for linting and formatting errors.
- `pnpm check:write`: Run Biome to fix linting and formatting errors.
- `pnpm typecheck`: Run the TypeScript compiler to check for type errors.
- `pnpm db:generate`: Generate Drizzle ORM migration files.
- `pnpm db:migrate`: Apply database migrations.
- `pnpm db:push`: Push database schema changes without generating migrations.
- `pnpm db:studio`: Open the Drizzle ORM studio.

## Development Conventions

- **Code Style**: The project uses Biome for code formatting and linting. Please run `pnpm check` before committing changes.
- **Type Safety**: The project uses TypeScript and tRPC to ensure end-to-end type safety.
- **Database**: The project uses Drizzle ORM for database access. Schema changes should be made by creating and applying migrations.
- **Styling**: The project uses Tailwind CSS for styling.

## Feature Architecture Patterns

### Component Organization

Each feature follows a consistent folder structure for components:

```
src/features/{entity}/
├── components/
│   ├── detail/
│   │   └── index.tsx          # Main detail component
│   ├── filter/
│   │   └── index.tsx          # Filter component with useFilter
│   ├── form/
│   │   ├── index.tsx          # Main form component  
│   │   └── skeleton.tsx       # Form loading skeleton
│   └── table/
│       └── index.tsx          # Main table component with useEntityPanel
├── constants/
│   └── form.ts                # Form mode options and constants
├── hooks/
│   ├── use-form.ts            # Consolidated form logic (query + mutation)
│   └── use-filter.ts          # Filter state and submission logic
├── schemas/
├── utils/
│   └── default.ts             # Default values for forms and filters
└── index.tsx
```

### Key Patterns and Conventions

**Component Naming:**
- Component exports: Generic names like `Form`, `Filter`, `Table` (context from folder structure)
- Props interfaces: Generic names like `TableProps`, `FormProps`, `DetailProps`  
- Type imports: Use shared types like `FormModalMode` from `~/shared/types/form-modal`

**Hook Patterns:**
- `useForm`: Consolidated hook handling both form data fetching and submission logic
- `useFilter`: Manages filter form state, submission, and popover control  
- Table components: Use `useEntityPanel<EntitySummary>()` directly (no custom hook needed)

**Hook Naming Convention:**
- Within entity feature context, use concise names: `useForm`, `useFilter`
- Avoid verbose suffixes like "Mutation" or "Query" when context is clear
- Consolidate related functionality into single hooks for simplicity

**Constants Organization:**
- Extract form mode options to `constants/form.ts` with `FORM_MODE_OPTIONS`
- Use shared `FormModalOptions` type from `~/shared/types/form-modal`
- Clean default values in `utils/default.ts` (no test data)

**Import Strategy:**
- Minimize TypeScript barrel exports (index.ts files) to avoid circular dependencies
- Import hooks directly from specific files rather than through barrels
- Use shared types from `~/shared/types/` for reusable interfaces

**Benefits:**
- Consistent patterns across all entity features
- Proper separation of concerns with custom hooks
- Reusable shared types and patterns
- Clean component interfaces without entity-specific prefixes
- Easy to scale and maintain

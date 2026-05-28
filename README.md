# Synth NET | To-Do List

A modern, full-stack To-Do List application built with **React + Vite + TypeScript** on the
frontend and **Supabase** (Auth, PostgreSQL, Row Level Security) on the backend. The codebase
follows a **modular monolith** architecture designed to scale.

## Features

- Email/password authentication + Google OAuth (Supabase Auth)
- Full todo CRUD: create, read, update, delete, and mark complete
- Per-user data isolation enforced by Postgres Row Level Security
- Optimistic completion toggle with TanStack Query
- Filter todos by All / Active / Completed
- Light & dark mode (system-aware, persisted)
- Responsive, mobile-friendly, minimal UI

## Tech Stack

| Layer        | Tools                                                                 |
| ------------ | -------------------------------------------------------------------- |
| Runtime      | Bun                                                                  |
| Framework    | React 19, Vite 8, TypeScript (strict)                               |
| Routing      | React Router DOM                                                     |
| Server state | TanStack Query                                                       |
| Client state | Zustand                                                              |
| Forms        | React Hook Form + Zod                                                |
| Notifications| Sonner                                                              |
| Icons        | Lucide React                                                         |
| Backend      | Supabase (Auth, PostgreSQL, RLS)                                     |
| Design       | Token-based design system (see `docs/DESIGN.md`)                     |

## Project Structure

```
synth-net-todo/
├── apps/
│   └── web/                  # Vite React app
│       └── src/
│           ├── app/          # providers, router, layouts (composition root)
│           ├── modules/      # feature modules (auth, todo)
│           │   └── <feature>/{components,hooks,pages,services,schemas,stores,types}
│           ├── shared/       # cross-cutting: components, hooks, lib, utils, constants, types
│           ├── styles/       # design tokens + global styles
│           └── main.tsx
├── docs/                     # PRD.md, DESIGN.md, API.md
├── supabase/                 # schema.sql, migrations/, seed.sql, functions/
├── .env.example
└── README.md
```

Each feature module is self-contained. Cross-feature code lives in `shared/`. The `app/` layer
wires everything together and is the only place modules are composed.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.3
- A [Supabase](https://supabase.com) project

### 1. Install dependencies

```bash
cd apps/web
bun install
```

### 2. Configure environment

Copy the example env file and fill in your Supabase credentials
(Supabase dashboard → **Project Settings → API**):

```bash
cp apps/web/.env.example apps/web/.env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

In the Supabase dashboard → **SQL Editor**, run the contents of
[`supabase/schema.sql`](supabase/schema.sql). This creates the `profiles` and `todos`
tables, the `updated_at` trigger, the auto-profile trigger, and enables Row Level Security
with per-user policies.

### 4. Enable Google OAuth (optional)

Supabase dashboard → **Authentication → Providers → Google**. Add your Google OAuth client
ID/secret and set the redirect URL to your app origin.

### 5. Run the app

```bash
cd apps/web
bun run dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

Run from `apps/web/`:

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `bun run dev`     | Start the Vite dev server            |
| `bun run build`   | Type-check and build for production   |
| `bun run preview` | Preview the production build          |
| `bun run lint`    | Run ESLint                            |

## Architecture Notes

- **Modular monolith** — features are isolated modules with their own service/hook/schema
  layers, so any one could later be extracted into its own service.
- **Service layer** — all Supabase calls live in `*.service.ts` files. UI never talks to
  Supabase directly, which keeps a clean seam for a future API abstraction layer.
- **Typed data access** — the Supabase client is typed against `shared/types/database.ts`,
  kept in sync with `supabase/schema.sql`.
- **Future scalability** — the structure leaves room for Redis, realtime sync, audit trails,
  notifications, queue workers, and background jobs without tight coupling.

See [`docs/`](docs/) for the PRD, design system, and API reference.

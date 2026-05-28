# PRD — Synth NET | To-Do List

> Markdown transcription of the original PRD (`Synth NET To-Do List PRD.pdf`, kept in this folder).

## Objective

Build a modern To-Do List app with **React + Supabase** to learn full-stack development using an
AI-assisted workflow. Must use a **modular monolith** architecture and be scalable for future
development.

## Tech Stack

**Frontend:** Bun, React, Vite, TypeScript, React Router DOM, Zustand, TanStack Query,
React Hook Form, Zod, Sonner, Lucide React.

**UI & Design:** design system generated via `getdesign` (`docs/DESIGN.md`).

**Backend:** Supabase — Auth, PostgreSQL, Row Level Security.

**Architecture:** Modular Monolith, structured for future scalability (Redis, audit trails,
notifications, realtime, queue workers, background jobs).

## Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Database Schema

- `profiles(id, full_name, avatar_url, created_at)` — `id` references `auth.users(id)`.
- `todos(id, user_id, title, description, is_completed, created_at, updated_at)`.
- RLS enabled on `todos` with a "Users can manage own todos" policy
  (`auth.uid() = user_id`).

## Authentication Requirements

Sign Up, Sign In, Sign Out, Google OAuth, Email & Password authentication.

## Todo Features

CRUD: create, read list, update, delete, mark as completed.

## Routing

- Public: `/login`, `/register`.
- Protected: `/dashboard` (protected route pattern).

## State Management

Zustand (client/UI state) + TanStack Query (server state) with clean async handling,
reusable hooks, and modular services.

## Coding Standards

Strict TypeScript, reusable components, no duplicated logic, modular architecture,
feature-based folder structure, clean naming.

**Naming:** `todo.service.ts`, `todo.types.ts`, `todo.schema.ts`, `todo.hook.ts`;
components `TodoCard.tsx`, `TodoForm.tsx`, `TodoList.tsx`.

## UI Requirements

Modern minimal design: responsive, dark-mode ready, clean spacing, mobile friendly,
smooth interaction.

## Final Goal

A running frontend app with a connected Supabase client, working authentication and todo CRUD
flows, modular architecture, and a clean scalable foundation — runnable via `bun run dev`.

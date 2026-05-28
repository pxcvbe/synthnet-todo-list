# API Reference

All data access goes through Supabase. There is no custom REST layer — the frontend uses the
typed Supabase client (`shared/lib/supabase.ts`), and **Row Level Security** scopes every query
to the authenticated user. This document describes the effective data API exposed by each
service module.

## Auth — `modules/auth/services/auth.service.ts`

| Method                          | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `signUp({ email, password, fullName })` | Register with email/password; stores `full_name` in user metadata. |
| `signInWithPassword({ email, password })` | Sign in with email/password.                  |
| `signInWithGoogle()`            | Start Google OAuth redirect flow.                      |
| `signOut()`                     | End the current session.                               |
| `getSession()`                  | Return the current session (or `null`).                |
| `onAuthStateChange(cb)`         | Subscribe to auth changes; returns an unsubscribe fn.  |

## Todos — `modules/todo/services/todo.service.ts`

All operations are restricted to `auth.uid() = user_id` by RLS.

| Method                                   | Table op | Description                          |
| ---------------------------------------- | -------- | ------------------------------------ |
| `list()`                                 | select   | All of the user's todos, newest first. |
| `create({ title, description })`         | insert   | Create a todo for the current user.  |
| `update({ id, title?, description?, is_completed? })` | update | Patch a todo.            |
| `remove(id)`                             | delete   | Delete a todo.                       |

## Data Model

### `profiles`

| Column       | Type          | Notes                                        |
| ------------ | ------------- | -------------------------------------------- |
| `id`         | `uuid` PK     | References `auth.users(id)`, cascade delete. |
| `full_name`  | `text`        | Nullable.                                    |
| `avatar_url` | `text`        | Nullable.                                    |
| `created_at` | `timestamptz` | Defaults to `now()`.                         |

A row is created automatically on sign-up via the `handle_new_user` trigger.

### `todos`

| Column         | Type          | Notes                                        |
| -------------- | ------------- | -------------------------------------------- |
| `id`           | `uuid` PK     | Defaults to `gen_random_uuid()`.             |
| `user_id`      | `uuid`        | References `auth.users(id)`, cascade delete. |
| `title`        | `text`        | Required.                                    |
| `description`  | `text`        | Nullable.                                    |
| `is_completed` | `boolean`     | Defaults to `false`.                         |
| `created_at`   | `timestamptz` | Defaults to `now()`.                         |
| `updated_at`   | `timestamptz` | Maintained by the `set_updated_at` trigger.  |

## Row Level Security

```sql
-- todos: full access only to rows the user owns
create policy "Users can manage own todos"
  on todos for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

Profiles have separate `select` and `update` policies scoped to `auth.uid() = id`. See
[`supabase/schema.sql`](../supabase/schema.sql) for the full definitions.

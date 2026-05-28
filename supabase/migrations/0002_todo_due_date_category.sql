-- Migration 0002 — add due_date and category to todos.

alter table todos add column if not exists due_date date;
alter table todos add column if not exists category text;

-- Restrict category to the preset set (null allowed = "no category").
alter table todos drop constraint if exists todos_category_check;
alter table todos add constraint todos_category_check
  check (category is null or category in ('work', 'personal', 'shopping', 'health', 'other'));

create index if not exists todos_category_idx on todos (category);
create index if not exists todos_due_date_idx on todos (due_date);

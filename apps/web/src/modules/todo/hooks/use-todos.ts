import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { QUERY_KEYS } from '@/shared/constants/query-keys'
import { todoService } from '../services/todo.service'
import type { Todo } from '../types/todo.types'

export function useTodos() {
  return useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: todoService.list,
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
      toast.success(t('toast.todoAdded'))
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('toast.todoAddFailed'))
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: todoService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
      toast.success(t('toast.todoUpdated'))
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('toast.todoUpdateFailed'))
    },
  })
}

/** Optimistic completion toggle — flips immediately, rolls back on error. */
export function useToggleTodo() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ id, is_completed }: { id: string; is_completed: boolean }) =>
      todoService.update({ id, is_completed }),
    onMutate: async ({ id, is_completed }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todos })
      const previous = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todos)
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todos, (todos) =>
        todos?.map((todo) => (todo.id === id ? { ...todo, is_completed } : todo)),
      )
      return { previous }
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEYS.todos, context.previous)
      }
      toast.error(error instanceof Error ? error.message : t('toast.todoUpdateFailed'))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: todoService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
      toast.success(t('toast.todoDeleted'))
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('toast.todoDeleteFailed'))
    },
  })
}

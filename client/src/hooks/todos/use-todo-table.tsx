import { useCallback } from 'react'
import { useCreateTodo } from './use-create-todo'
import { useTodos } from './use-todos'

export const useTodoTable = () => {
  const { data } = useTodos()
  const [createTodo] = useCreateTodo()

  const onCreateTodo = useCallback(() => {
    createTodo({
      variables: {
        todo: {
          description: '',
          done: false,
          target_date: new Date().toISOString()
        }
      }
    })
  }, [])
  return {
    todos: data?.todos,
    onCreateTodo
  }
}

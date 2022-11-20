import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDeleteTodos } from './use-delete-todos'
import { todos_data } from './use-todos'
import { useUpdateTodo } from './use-update-todo'
type Todo = todos_data['todos'][number]

export const useTodoEntry = (todo_data: Todo) => {
  const [updateTodo] = useUpdateTodo()
  const [deleteTodos] = useDeleteTodos()

  const [todo, setTodo] = useState(todo_data)

  const isModified = useMemo(() => {
    return (
      todo.description !== todo_data.description ||
      todo.done !== todo_data.done ||
      todo.target_date !== todo_data.target_date
    )
  }, [todo, todo_data])

  const onSave = useCallback(() => {
    updateTodo({
      variables: {
        todo: {
          description: todo.description,
          done: todo.done,
          todo_id: todo.id,
          target_date: todo.target_date
        }
      }
    })
  }, [todo])

  const onDelete = useCallback(() => {
    deleteTodos({
      variables: {
        todoIds: [todo.id]
      }
    })
  }, [todo])

  const onDescriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodo(state => ({ ...state, description: e.target.value }))
  }, [])
  const onDoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodo(state => ({ ...state, done: e.target.checked }))
  }, [])
  const onDateChange = useCallback((date: Date) => {
    setTodo(state => ({ ...state, target_date: date.toISOString() }))
  }, [])

  return {
    todo,
    isModified,
    onSave,
    onDelete,
    onDescriptionChange,
    onDoneChange,
    onDateChange
  }
}

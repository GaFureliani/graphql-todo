import { gql, useMutation } from '@apollo/client'

export type delete_todos_data = {
  delete_todos: number[]
}

export type delete_todos_input = {
  todoIds: number[]
}

const delete_todos = gql`
  mutation DeleteTodos($todoIds: [Int!]!) {
    delete_todos(todo_ids: $todoIds)
  }
`

export const useDeleteTodos = () => useMutation<delete_todos_data, delete_todos_input>(delete_todos)

import { gql, useMutation } from '@apollo/client'

export type update_todo_data = {
  id: number
  done: boolean
  description: string
  target_date: string
  author: {
    id: number
    email: string
    username: string
  }
  created_at: string
  updated_at: string
}

export type update_todo_input = {
  todo: {
    todo_id: number
    description?: string
    done?: boolean
    target_date?: Date
  }
}

const update_todo = gql`
  mutation UpdateTodo($todo: update_todo_input!) {
    update_todo(todo: $todo) {
      id
      done
      description
      target_date
      author {
        id
        email
        username
      }
      created_at
      updated_at
    }
  }
`

export const useUpdateTodo = () => useMutation<update_todo_data, update_todo_input>(update_todo)

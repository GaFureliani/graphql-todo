import { gql, useMutation } from "@apollo/client";

export interface create_todo_data {
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

export interface create_todo_input {
  todo: {
    target_date: Date
    description: string
    done: boolean
  }
}

const create_todo = gql`
  mutation CreateTodo($todo: create_todo_input!) {
    create_todo(todo: $todo) {
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

export const useCreateTodo = () => useMutation<create_todo_data, create_todo_input>(create_todo) 

import { gql, useQuery } from "@apollo/client";

export interface todos_data {
  todos: {
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
  }[]
}

export const todos = gql`
  query Todos {
    todos {
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

export const useTodos = () => useQuery<todos_data>(todos)

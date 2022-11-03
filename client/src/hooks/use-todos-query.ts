import { gql, useQuery } from "@apollo/client";

export interface TodosResponse {
  get_todos: {
    id: number
    created_at: string
    description: string
    done: boolean
    target_date: string
    updated_at: string
    author: {
      id: number
      email: string
      username: string
    }
  }[]
}

export const todos_query = gql`
  query {
    get_todos {
      id
      created_at
      description
      done
      target_date
      updated_at
      author {
        id
        email
        username
      }
    }
  }
`

export const useTodosQuery = () => useQuery<TodosResponse>(todos_query)
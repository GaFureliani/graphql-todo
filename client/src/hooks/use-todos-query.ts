import { gql, useQuery } from "@apollo/client";

export type GET_TODOS_RESPONSE = {
  id: number
  created_at: Date
  description: string
  done: boolean
  target_date: Date
  updated_at: Date
  author: {
    id: number
    email: string
    username: string
  }
}[]

const GET_TODOS = gql`
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

export const useTodosQuery = () => useQuery<GET_TODOS_RESPONSE>(GET_TODOS)
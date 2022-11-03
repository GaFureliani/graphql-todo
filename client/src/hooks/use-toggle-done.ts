import { gql, useMutation } from "@apollo/client";
import { todos_query } from "./use-todos-query";

const done_mutation = gql`
  mutation($todoId: Int!, $done: Boolean!){
    done(todo_id: $todoId, done: $done)
  }
`

export interface done_mutation_response {
  done: boolean
}

export interface done_mutation_variables {
  todoId: number, done: boolean
}

export const useToggleDone = () => useMutation<done_mutation_response, done_mutation_variables>(done_mutation, {
  refetchQueries: [todos_query]
})
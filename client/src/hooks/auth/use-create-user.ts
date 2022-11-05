import { gql, useMutation } from "@apollo/client";

export interface create_user_data {
  create_user: {
    id: number
    email: string
    username: string
    access_token: string
  }
}

export interface create_user_input {
  user: {
    email: string
    username: string
    password: string
  }
}

const create_user = gql`
  mutation CreateUser($user: create_user_input!) {
    create_user(user: $user) {
      id
      email
      username
      access_token
    }
  }
`

export const useCreateUser = () => useMutation<create_user_data, create_user_input>(create_user)

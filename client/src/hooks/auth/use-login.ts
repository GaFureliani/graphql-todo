import { gql, useMutation } from "@apollo/client";

export interface login_data {
  login: {
    id: number
    email: string
    username: string
    access_token: string
  }
}

export interface login_input {
  login: {
    email: string
    password: string
    with_credentials: boolean
  }
} 

export const login = gql`
  mutation Login($login: login_input!) {
    login(login: $login) {
      id
      email
      username
      access_token
    }
  }
`

export const useLogin = () => useMutation<login_data, login_input>(login)

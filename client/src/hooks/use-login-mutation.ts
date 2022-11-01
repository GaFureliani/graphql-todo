import { gql, useMutation } from "@apollo/client";

export interface login_user_input {
  email: string
  password: string
}

export interface AuthData {
  user_id: string
  username: string
  access_token: string
}

const LOGIN_MUTATION = gql`
  mutation($login_data: login_user_input!) {
    login_user(login: $login_data) {
      access_token
    }
  }
`

export const useLoginMutation = () => useMutation<AuthData, login_user_input>()
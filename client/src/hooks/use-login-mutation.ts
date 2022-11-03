import { gql, useMutation } from "@apollo/client";

export interface LoginVariables {
  login_data: {
    email: string
    password: string
  }
}

export interface LoginResponse {
  login_user: {
    user_id: number
    username: string
    access_token: string
  }
}

const LOGIN_MUTATION = gql`
  mutation($login_data: login_user_input!) {
    login_user(login: $login_data) {
      user_id
      username
      access_token
    }
  }
`

export const useLoginMutation = () => useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION)
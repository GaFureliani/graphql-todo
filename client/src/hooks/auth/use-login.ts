import { gql, useMutation } from '@apollo/client'
import { todos } from 'hooks/todos/use-todos'
import { useAuth } from './use-auth'

export type login_data = {
  login: {
    id: number
    email: string
    username: string
    access_token: string
  }
}

export type login_input = {
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

export const useLogin = () => useMutation<login_data, login_input>(login,
  {
    refetchQueries: [todos],
    onCompleted: ({ login: user }) => {
      useAuth.setState({ user })
    }
  })

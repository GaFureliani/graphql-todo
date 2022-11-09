import { gql, useMutation } from '@apollo/client'

type logout_data = {
  logout: boolean
}

const logout = gql`
  mutation Logout {
    logout
  }
`

export const useLogout = () => useMutation<logout_data>(logout)

import { gql, useMutation } from "@apollo/client";

interface logout_data {
  logout: boolean
}

const logout = gql`
  mutation Logout {
    logout
  }
`

export const useLogout = () => useMutation<logout_data>(logout)

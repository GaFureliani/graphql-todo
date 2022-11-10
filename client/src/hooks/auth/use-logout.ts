import { gql, useMutation } from '@apollo/client'
import { useAuth } from './use-auth'

type logout_data = {
  logout: boolean
}

const logout = gql`
  mutation Logout {
    logout
  }
`

export const useLogout = () => useMutation<logout_data>(logout, {
  onCompleted: () => {
    useAuth.getState().reset()
  }
})

import { gql, useMutation } from "@apollo/client"

type LogoutVariables = void
interface LogoutResponse {
  logout_user: {
    ok: boolean
  }
}

const logout_mutation = gql`
  mutation {
    logout_user {
      ok
    }
  }
`

export const useLogoutMutation = () => useMutation<LogoutResponse>(logout_mutation)
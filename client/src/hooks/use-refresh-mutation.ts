import { gql, useMutation } from "@apollo/client"

interface refresh_response {
  refresh_token: {
    user_id: number,
    username: string
    access_token: string,
  }
}

const refresh_mutation = gql`
  mutation {
    refresh_token {
      user_id
      username
      access_token
    }
  }
`

export const useRefreshMutation = () => useMutation<refresh_response>(refresh_mutation)
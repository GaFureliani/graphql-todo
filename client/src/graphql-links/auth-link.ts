import { ApolloLink } from "@apollo/client"
import { useAuth } from "hooks/auth/use-auth"

export const auth_link = new ApolloLink((operation,forward)=>{
  operation.setContext({
    headers: {
      authorization: `Bearer ${useAuth.getState().user.access_token}`
    }
  })
  return forward(operation)
})
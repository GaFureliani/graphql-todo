import { setContext } from "@apollo/client/link/context"
import { useAuth } from "hooks/auth/use-auth"


export const auth_link = setContext(async (req, prevContext) => {

  return {
    headers: {
      authorization: `Bearer ${useAuth.getState().user.access_token}`
    }
  }
})
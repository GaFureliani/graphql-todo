import { setContext } from "@apollo/client/link/context"
import { Mutex } from "async-mutex";
import { useAuth } from "hooks/auth/use-auth"
import { login, login_data } from "hooks/auth/use-login";
import jwt_decode from "jwt-decode";
import { client } from "main";

const relogin = async () => {
  const response = await client.mutate({
    mutation: login,
    variables: {
      login: {
        email: '',
        password: '',
        with_credentials: false
      }
    }
  })

  return response
}

const mutex = new Mutex()

export const auth_link = setContext(async (req, prevContext) => {
  if(req.operationName === 'Login') return
  if(req.operationName === 'CreateUser') return

  if(!mutex.isLocked()) {
    let access_token = useAuth.getState().user.access_token
    await mutex.acquire()
    if(!access_token) {
      const response = await relogin()
      const user = (response.data as login_data).login
      useAuth.setState({ user })
    } else {
      try {
        const decoded = jwt_decode(access_token) as {exp: number}
        if(Date.now() < decoded.exp * 1000) {
          const response = await relogin()
          const user = (response.data as login_data).login
          useAuth.setState({ user })
        }
      } catch (e) {
        access_token = ''
      }
    }
  } else {
    await mutex.waitForUnlock()
  }

  return {
    headers: {
      authorization: `Bearer ${useAuth.getState().user.access_token}`
    }
  }
})
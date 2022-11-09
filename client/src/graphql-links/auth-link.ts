import { setContext } from '@apollo/client/link/context'
import { refresh_token } from 'helpers/refresh-token'
import { useAuth } from 'hooks/auth/use-auth'
import jwtDecode, { JwtPayload, InvalidTokenError } from 'jwt-decode'
import { toast } from 'react-toastify'

const get_new_token = async () => {
  const response = await refresh_token()
  if (typeof response !== 'undefined') {
    useAuth.setState({ user: response.refresh })
  } else {
    useAuth.getState().reset()
  }
}

export const auth_link = setContext(async (req, prevContext) => {
  if (req.operationName === 'Login' || req.operationName === 'CreateUser') {
    return prevContext.headers
  }
  const current_access_token = useAuth.getState().user.access_token
  if (current_access_token === '') {
    await get_new_token()
  } else {
    try {
      const decoded = jwtDecode<JwtPayload>(current_access_token)
      if (typeof decoded.exp === 'undefined') {
        toast.error('No token expiration date error.')
      } else if (decoded.exp < Date.now() / 1000) {
        await get_new_token()
      }
    } catch (e) {
      if (e instanceof InvalidTokenError) {
        toast.error(e.message)
      }
    }
  }

  return {
    headers: {
      authorization: `Bearer ${useAuth.getState().user.access_token}`
    }
  }
})

import { Login } from 'components/auth/login'
import { SignUp } from 'components/auth/signup'
import { Logout } from 'components/auth/logout'
import { useAuth } from 'hooks/auth/use-auth'
import { Fragment } from 'react'

export const Appbar = () => {
  const [username, access_token] = useAuth(state => [state.user.username, state.user.access_token])
  return (
    <div className="flex items-center gap-3 bg-violet-700 h-[64px] justify-end px-4 shadow-xl">
      { access_token === '' && (
        <Fragment>
          <Login/>
          <SignUp/>
        </Fragment>
      )}
      { access_token !== '' && (
        <Fragment>
          <span className='bg-white px-4 py-2 font-semibold rounded-full'>{username}</span>
          <Logout />
        </Fragment>
      )}
    </div>
  )
}

import { SignUp } from '../auth/signup'
import { Login } from '../auth/login'
import { Modal } from '../modal'
import { useAuth } from 'hooks/auth/use-auth'
import { LogoutBtn } from '../auth/logout-btn'

export const Appbar = () => {
  const [username, access_token] = useAuth(state => [state.user.username, state.user.access_token])
  return (
    <div className="bg-white h-[64px] flex items-center justify-between px-4 shadow-xl mb-4 font-bold border-b-2">
      <button className="text-blue-700 transition-all hover:bg-blue-50 p-4 rounded-xl text-xl">The Best Todo Application</button>
      <div className="flex items-center gap-8">
        {username}
        {
          access_token !== ''
            ? <LogoutBtn />
            : <div className="flex items-center gap-3">
              <Modal openButton={
                <button className="px-5 py-2 bg-blue-700 text-white rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>
            }>
                <Login />
              </Modal>
              <Modal openButton={
                <button className="px-5 py-2 bg-blue-700 text-white rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </button>
            }>
                <SignUp />
              </Modal>
            </div>
        }
      </div>
    </div>
  )
}

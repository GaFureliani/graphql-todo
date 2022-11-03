import { SignUp } from "./auth/signup"
import { Login } from "./auth/login"
import { Modal } from "./modal"
import { useAuth } from "hooks/use-auth"
import { Fragment } from "react"
import { LogoutBtn } from "./auth/logout-btn"

export const Appbar = () => {
  const [username, access_token] = useAuth(state=>[state.user.username, state.user.access_token])
  return (
    <div className="bg-white h-[64px] flex items-center justify-between px-4 shadow-xl mb-4 font-bold border-b-2">
      <button className="text-blue-700 transition-all hover:bg-blue-50 p-4 rounded-xl text-xl">The Best Todo Application</button>
      <div className="flex items-center gap-8">
        {username}
        {
          access_token ?
          <LogoutBtn />: 
          <div className="flex items-center gap-3">
            <Modal buttonText="Login" title="Login">
              <Login />
            </Modal>
            <Modal buttonText="Sign Up" title="Sign Up">
              <SignUp />
            </Modal>
          </div>
        }
      </div>
    </div>
  )
}
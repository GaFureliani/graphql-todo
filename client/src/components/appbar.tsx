import { Login } from "./login"
import { Modal } from "./modal"

export const Appbar = () => {
  return (
    <div className="bg-white h-[64px] flex items-center justify-between px-4 shadow-xl mb-4 font-bold border-b-2">
      <button className="text-blue-700 transition-all hover:bg-blue-50 p-4 rounded-xl">The Best Todo Application</button>
      <div className="flex items-center gap-3">
        <Modal buttonText="login" title="Login">
          <Login />
        </Modal>
      </div>
    </div>
  )
}
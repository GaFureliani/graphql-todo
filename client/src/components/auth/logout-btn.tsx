import { useAuth } from "hooks/use-auth"
import { useLogoutMutation } from "hooks/use-logout-mutation"

export const LogoutBtn = () => {
  const [logout, { loading }] = useLogoutMutation()
  const setUser = useAuth(state=>state.setUser)
  const handleLogout = () => {
    logout()
    .then((response) => {
      setUser({access_token: '', user_id: 0, username: ''})
    })
  }
  return (
    <button onClick={handleLogout} disabled={loading} className="flex items-center justify-center gap-2 bg-blue-600 px-4 py-2 rounded-md text-white w-full">
    Log out
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  </button>
  )
}
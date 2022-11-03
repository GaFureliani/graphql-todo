import create from 'zustand'
import { LoginResponse } from './use-login-mutation'

interface useAuthProps {
  user: LoginResponse['login_user']
  setUser: (user: LoginResponse['login_user']) => void
}

export const useAuth = create<useAuthProps>((set)=> ({
  user: {access_token: '', user_id: 0, username: ''},
  setUser: (user) => { set({ user }) },
}))

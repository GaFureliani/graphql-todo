import create from 'zustand'

interface User {
  id: number
  username: string
  email: string
  access_token: string
}

interface useAuthProps {
  user: User
  setUser: (user: User) => void
  reset: () => void
}

const initial: User = { id: -1, username: '', email: '', access_token: '' }

export const useAuth = create<useAuthProps>((set)=> ({
  user: initial,
  setUser: (user) => { set({ user }) },
  reset: () => { set({ user: initial }) }
}))

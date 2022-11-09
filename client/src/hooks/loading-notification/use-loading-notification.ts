import create from 'zustand'

type useLoadingNotificationProps = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingNotification = create<useLoadingNotificationProps>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => { set({ isLoading }) }
}))

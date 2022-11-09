export const environment = () => {
  const API_URL = import.meta.env.VITE_API_URL as string | undefined
  if (typeof API_URL === 'undefined') throw new Error('Please set the "VITE_API_URL" environment variable.')
  return {
    API_URL
  }
}

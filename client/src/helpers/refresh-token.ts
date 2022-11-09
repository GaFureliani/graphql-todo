import axios from 'axios'
import { environment } from './environment'

type refresh_token_data = {
  data: {
    refresh: {
      id: number
      email: string
      username: string
      access_token: string
    }
  }
}

export const refresh_token = async () => {
  try {
    const response = await axios.post<refresh_token_data>(environment().API_URL, {
      query: `
      mutation Refresh{
        refresh {
          id
          email
          username
          access_token
        }
      } 
      `
    }, { withCredentials: true })
    return response.data.data
  } catch {
    return undefined
  }
}

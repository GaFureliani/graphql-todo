import { createHttpLink } from '@apollo/client'
import { environment } from 'helpers/environment'

export const httpLink = createHttpLink({
  uri: environment().API_URL,
  credentials: 'include'
})

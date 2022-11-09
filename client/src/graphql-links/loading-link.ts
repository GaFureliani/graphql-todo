import { ApolloLink } from '@apollo/client'
import { useLoadingNotification } from 'hooks/loading-notification/use-loading-notification'

export const loading_link = new ApolloLink((operation, forward) => {
  useLoadingNotification.setState({ isLoading: true })
  return forward(operation).map((data) => {
    useLoadingNotification.setState({ isLoading: false })
    return data
  })
})

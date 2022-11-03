import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, from } from '@apollo/client'

import { useAuth } from 'hooks/use-auth'

const authLink = new ApolloLink((operation,forward)=>{
  operation.setContext({
    headers: {
      authorization: `Bearer ${useAuth.getState().user.access_token}`
    }
  })
  return forward(operation)
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink])
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'App'

import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { link } from 'graphql-links/link'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

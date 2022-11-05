import { onError } from "@apollo/client/link/error";
import { fromPromise } from '@apollo/client'
import { client } from 'main'
import { login, login_data } from "hooks/auth/use-login";
import { useAuth } from "hooks/auth/use-auth";
let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const relogin = () => {
  return client.mutate({ mutation: login, variables: {
    login: {
      email: '',
      password: '',
      with_credentials: false,
    }
  } }).then((response) => {
    return response.data as login_data;
  });
};

export const relogin_link = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            let forward$;

            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                relogin()
                  .then((response) => {
                    // Store the new tokens for your auth link
                    useAuth.setState({user: response.login})
                    resolvePendingRequests();
                    return response.login.access_token;
                  })
                  .catch(error => {
                    pendingRequests = [];
                    // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter(value => Boolean(value));
            } else {
              // Will only emit once the Promise is resolved
              forward$ = fromPromise(
                new Promise<void>(resolve => {
                  pendingRequests.push(() => resolve());
                })
              );
            }

            return forward$.flatMap(() => forward(operation));
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

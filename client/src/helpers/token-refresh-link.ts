import { onError } from "@apollo/client/link/error";
import { fromPromise } from '@apollo/client'

import { refresh_mutation, refresh_response } from 'hooks/use-refresh-mutation';
import { client } from 'main'
let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const getNewToken = () => {
  return client.mutate({ mutation: refresh_mutation }).then((response) => {
    // extract your accessToken from your response data and return it
    const { access_token } = (response.data as refresh_response).refresh_token;
    return access_token;
  });
};

export const errorLink = onError(
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
                getNewToken()
                  .then((access_token) => {
                    // Store the new tokens for your auth link
                    resolvePendingRequests();
                    return access_token;
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

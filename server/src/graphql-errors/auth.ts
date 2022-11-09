import { GraphQLError } from 'graphql'

export const GRAPHQL_ERROR_UNAUTHENTICATED = new GraphQLError('Please login before making this request.', { extensions: { code: 'UNAUTHENTICATED' } })
export const GRAPHQL_ERROR_INVALID_CREDENTIALS = new GraphQLError('Invalid credentials.', { extensions: { code: 'INVALID_CREDENTIALS' } })
export const GRAPHQL_ERROR_INVALID_REFRESH_TOKEN = new GraphQLError('Invalid refresh token.', { extensions: { code: 'INVALID_REFRESH_TOKEN' } })
export const GRAPHQL_ERROR_REFRESH_TOKEN_NOT_FOUND = new GraphQLError('Refresh token not found.', { extensions: { code: 'REFRESH_TOKEN_NOT_FOUND' } })
export const GRAPHQL_ERROR_USER_NOT_FOUND = new GraphQLError('User not found.', { extensions: { code: 'USER_NOT_FOUND' } })

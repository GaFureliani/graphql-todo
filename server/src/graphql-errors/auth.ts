import { GraphQLError } from "graphql";

export const GRAPHQL_ERROR_UNAUTHENTICATED = new GraphQLError('Please login before making this request.', {extensions: { code: 'UNAUTHENTICATED' }})
export const GRAPHQL_ERROR_INVALID_CREDENTIALS = new GraphQLError('Invalid credential(s).', {extensions: { code: 'INVALID_CREDENTIALS' }})
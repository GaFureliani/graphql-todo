import { GraphQLError } from "graphql";

export const GRAPHQL_ERROR_UNAUTHENTICATED = new GraphQLError('Please login before making this request.', {extensions: { code: 'UNAUTHENTICATED' }})
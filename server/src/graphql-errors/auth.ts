import { GraphQLError } from "graphql";

export const APOLLO_ERROR_UNAUTHENTICATED = new GraphQLError('Please login before making this request.')
import { ApolloError } from "apollo-server";

export const APOLLO_ERROR_UNAUTHENTICATED = new ApolloError('Please login before making this request.')
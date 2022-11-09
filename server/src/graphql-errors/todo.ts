import { GraphQLError } from 'graphql'

export const GRAPHQL_ERROR_TODO_AUTHOR_NOT_FOUND = new GraphQLError('Todo author not found.', { extensions: { code: 'TODO_AUTHOR_NOT_FOUND' } })

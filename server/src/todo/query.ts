import { list, nonNull, queryField } from "nexus";
import { GRAPHQL_ERROR_UNAUTHENTICATED } from "src/graphql-errors/auth";

export const todos = queryField('todos', {
    type: nonNull(list(nonNull("Todo"))),
    async resolve(root, args, ctx) {
        const user_id = ctx.user_id
        if(!user_id) throw GRAPHQL_ERROR_UNAUTHENTICATED

        const todos = ctx.prisma.todo.findMany({
            where: {
                author_id: user_id
            }
        })

        return todos
    }
})
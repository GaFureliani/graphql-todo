import { ApolloError } from "apollo-server"
import { arg, inputObjectType, mutationField, nonNull } from "nexus"
import { APOLLO_ERROR_UNAUTHENTICATED } from "src/graphql-errors/auth"

export const create_todo_input = inputObjectType({
    name: "create_todo_input",
    definition(t){
        t.nonNull.string("description")
        t.nonNull.date("target_date") // TODO: fix date implementation
    }
})

export const create_todo =  mutationField('create_todo', {
    type: nonNull("Todo"),
    args: {
        todo: nonNull(arg({ type: create_todo_input }))
    },
    async resolve(root, args, ctx){
        const user_id = ctx.user_id
        if(!user_id) throw APOLLO_ERROR_UNAUTHENTICATED

        const todo = await ctx.prisma.todo.create({
            data: {
                description: args.todo.description,
                target_date: args.todo.target_date,
                author: {
                    connect: {
                        id: user_id
                    }
                }
            }
        })
        const {author_id, ...rest} = todo
        return rest
    }
})
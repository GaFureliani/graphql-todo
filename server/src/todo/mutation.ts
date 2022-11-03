import { arg, inputObjectType, mutationField, nonNull, objectType } from "nexus"
import { GRAPHQL_ERROR_UNAUTHENTICATED } from "src/graphql-errors/auth"

export const create_todo_input = inputObjectType({
    name: "create_todo_input",
    definition(t){
        t.nonNull.string("description")
        t.nonNull.field("target_date", { type: "DateTime" })
    }
})

export const create_todo =  mutationField('create_todo', {
    type: nonNull("Todo"),
    args: {
        todo: nonNull(arg({ type: create_todo_input }))
    },
    async resolve(root, args, ctx){
        const user_id = ctx.user_id
        if(!user_id) throw GRAPHQL_ERROR_UNAUTHENTICATED

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

export const set_done = mutationField('done', {
    type: "Boolean",
    args: {
        todo_id: nonNull("Int"),
        done: nonNull("Boolean")
    },
    async resolve(root, args, ctx) {
        const todo = await ctx.prisma.todo.update({
            where:{
                id: args.todo_id
            },
            data: {
                done: args.done
            }
        })

        return todo.done
    }
})
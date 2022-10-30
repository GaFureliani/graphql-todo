import { list, nonNull, objectType } from "nexus";

export const user = objectType({
    name: 'User',
    definition(t){
        t.nonNull.int("id")
        t.nonNull.string("email")
        t.nonNull.string("username")
        t.nonNull.list.nonNull.field("todos", {
            type: "Todo",
            async resolve(root, args, ctx){
                const user = await ctx.prisma.user.findUnique({
                    where: {
                        id: root.id
                    },
                    include: {
                        todos: true
                }})

                return user?.todos ?? []
            }
        })
    }
})
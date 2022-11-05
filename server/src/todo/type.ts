import { objectType } from "nexus";

export const GQL_Todo = objectType({
    name: 'Todo',
    definition(t){
        t.nonNull.int("id")          
        t.nonNull.string("description") 
        t.nonNull.field("target_date", { type: 'DateTime' })
        t.nonNull.boolean("done")        
        t.nonNull.field("created_at", { type: 'DateTime' })
        t.nonNull.field("updated_at", { type: 'DateTime' })
        t.nonNull.field("author", {
            type: 'User',
            async resolve(root, args, ctx){
                const todo = await ctx.prisma.todo.findUnique({
                    where: {
                        id: root.id
                    },
                    select: {
                        author: {
                            select: {
                                id: true,
                                email: true,
                                username: true,
                            }
                        }
                    }
                })
                const author = todo?.author!
                return author
            }
        })         
    }
})
import { objectType } from "nexus";

export const todo_type = objectType({
    name: 'Todo',
    definition(t){
        t.nonNull.int("id")          
        t.nonNull.string("description") 
        t.nonNull.date("target_date")    //TODO: fix date implementation
        t.nonNull.boolean("done")        
        t.nonNull.date("created_at")  //TODO: fix date implementation
        t.nonNull.date("updated_at")  //TODO: fix date implementation
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
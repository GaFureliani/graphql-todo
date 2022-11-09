import { objectType } from 'nexus'

export const GQL_USER = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.int('id')
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.string('access_token')
    t.nonNull.list.nonNull.field('todos', {
      type: 'Todo',
      async resolve (root, args, ctx) {
        const todos = await ctx.prisma.todo.findMany({
          where: {
            id: root.id
          }
        })

        return todos
      }
    })
  }
})

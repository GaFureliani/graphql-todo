import { arg, inputObjectType, list, mutationField, nonNull } from 'nexus'
import { GRAPHQL_ERROR_UNAUTHENTICATED } from 'src/graphql-errors/auth'

export const create_todo_input = inputObjectType({
  name: 'create_todo_input',
  definition (t) {
    t.nonNull.string('description')
    t.nonNull.boolean('done')
    t.nonNull.field('target_date', { type: 'Date' })
  }
})

export const create_todo = mutationField('create_todo', {
  type: nonNull('Todo'),
  args: {
    todo: nonNull(arg({ type: create_todo_input }))
  },
  async resolve (root, args, ctx) {
    if (typeof ctx.user_id === 'undefined') throw GRAPHQL_ERROR_UNAUTHENTICATED

    const todo = await ctx.prisma.todo.create({
      data: {
        description: args.todo.description,
        target_date: args.todo.target_date,
        done: args.todo.done,
        author: {
          connect: {
            id: ctx.user_id
          }
        }
      }
    })
    const { author_id, ...rest } = todo
    return rest
  }
})

export const update_todo_input = inputObjectType({
  name: 'update_todo_input',
  definition (t) {
    t.nonNull.int('todo_id')
    t.string('description')
    t.boolean('done')
    t.field('target_date', { type: 'Date' })
  }
})

export const update_todo = mutationField('update_todo', {
  type: nonNull('Todo'),
  args: {
    todo: nonNull(arg({ type: update_todo_input }))
  },
  description: 'Returns a Todo object after the update',
  async resolve (root, args, ctx) {
    if (typeof ctx.user_id === 'undefined') throw GRAPHQL_ERROR_UNAUTHENTICATED

    const id = args.todo.todo_id

    const todo_after_update = {
      ...(args.todo.target_date !== null ? { target_date: args.todo.target_date } : {}),
      ...(args.todo.description !== null ? { description: args.todo.description } : {}),
      ...(args.todo.done !== null ? { done: args.todo.done } : {})
    }

    const todo = await ctx.prisma.todo.update({
      where: {
        id,
        author_id: ctx.user_id
      },
      data: {
        ...todo_after_update
      }
    })

    const { author_id, ...rest } = todo

    return rest
  }
})

export const delete_todos = mutationField('delete_todos', {
  type: nonNull('Int'),
  args: { todo_ids: nonNull(list(nonNull('Int'))) },
  description: 'Returns the number of deleted Todo\'s',
  async resolve (root, args, ctx) {
    if (typeof ctx.user_id === 'undefined') throw GRAPHQL_ERROR_UNAUTHENTICATED
    const todos = await ctx.prisma.todo.deleteMany({
      where: {
        AND: {
          id: {
            in: args.todo_ids
          },
          author_id: ctx.user_id
        }
      }
    })
    return todos.count
  }
})

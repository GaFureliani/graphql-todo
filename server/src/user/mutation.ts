import { arg, inputObjectType, mutationField, nonNull } from 'nexus'
import { compare, hash } from 'bcrypt'
import { generate_token, verify_token } from 'src/helpers/tokens'
import { FIVE_DAYS_IN_MS } from 'src/helpers/time'
import {
  GRAPHQL_ERROR_INVALID_CREDENTIALS,
  GRAPHQL_ERROR_INVALID_REFRESH_TOKEN,
  GRAPHQL_ERROR_REFRESH_TOKEN_NOT_FOUND,
  GRAPHQL_ERROR_USER_NOT_FOUND
} from 'src/graphql-errors/auth'

export const create_user_input = inputObjectType({
  name: 'create_user_input',
  definition (t) {
    t.nonNull.string('username')
    t.nonNull.string('password')
    t.nonNull.string('email')
  }
})

export const create_user = mutationField('create_user', {
  type: nonNull('User'),
  args: { user: nonNull(arg({ type: create_user_input })) },
  async resolve (root, args, ctx) {
    const hashed_password = await hash(args.user.password, 10)

    const user = await ctx.prisma.user.create({
      data: {
        username: args.user.username,
        password: hashed_password,
        email: args.user.email
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    })

    const new_access_token = generate_token('access', { user_id: user.id })
    const new_refresh_token = generate_token('refresh', { user_id: user.id })

    ctx.res.cookie('refresh', new_refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + FIVE_DAYS_IN_MS)
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      access_token: new_access_token
    }
  }
})

export const login_input = inputObjectType({
  name: 'login_input',
  definition (t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const login = mutationField('login', {
  type: nonNull('User'),
  args: { login: nonNull(arg({ type: login_input })) },
  async resolve (root, args, ctx) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: args.login.email
      }
    })

    if (user == null) throw GRAPHQL_ERROR_INVALID_CREDENTIALS

    const is_valid_password = await compare(args.login.password, user.password)
    if (!is_valid_password) throw GRAPHQL_ERROR_INVALID_CREDENTIALS

    const new_access_token = generate_token('access', { user_id: user.id })
    const new_refresh_token = generate_token('refresh', { user_id: user.id })

    ctx.res.cookie('refresh', new_refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + FIVE_DAYS_IN_MS)
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      access_token: new_access_token
    }
  }
})

export const refresh = mutationField('refresh', {
  type: nonNull('User'),
  async resolve (root, args, ctx) {
    const refresh_token = ctx.req.cookies.refresh as string

    if (refresh_token === '') throw GRAPHQL_ERROR_REFRESH_TOKEN_NOT_FOUND

    const token_data = verify_token('refresh', refresh_token)

    if (token_data == null) throw GRAPHQL_ERROR_INVALID_REFRESH_TOKEN

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: token_data.user_id
      }
    })

    if (user == null) throw GRAPHQL_ERROR_USER_NOT_FOUND

    const new_access_token = generate_token('access', { user_id: user.id })
    const new_refresh_token = generate_token('refresh', { user_id: user.id })

    ctx.res.cookie('refresh', new_refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + FIVE_DAYS_IN_MS)
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      access_token: new_access_token
    }
  }
})

export const logout = mutationField('logout', {
  type: 'Boolean',
  async resolve (root, args, ctx) {
    ctx.res.clearCookie('refresh')

    return true
  }
})

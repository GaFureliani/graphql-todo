import { arg, inputObjectType, mutationField, nonNull, objectType } from "nexus";
import { compare, hash } from 'bcrypt'
import { ApolloError } from "apollo-server";
import { generate_token } from "src/helpers/tokens";
export const create_user_input = inputObjectType({
    name: "create_user_input",
    definition(t){
        t.nonNull.string("username")
        t.nonNull.string("password")
        t.nonNull.string("email")
    }
})

export const create_user = mutationField('create_user', {
    type: nonNull("User"),
    args: {user: nonNull(arg({type: create_user_input}))},
    async resolve(root, args, ctx) {
        const hashed_password = await hash(args.user.password, 10)

        const user = await ctx.prisma.user.create({
            data: {
                username: args.user.username,
                password: hashed_password,
                email: args.user.email,
            },
            select: {
                id: true,
                email: true,
                username: true
            }
        })

        return user
    }
})

export const AuthData = objectType({
    name: 'AuthData',
    definition(t){
        t.nonNull.int('user_id')
        t.nonNull.string('access_token')
        t.nonNull.string('username')
    }
})

export const login_user_input = inputObjectType({
    name: 'login_user_input',
    definition(t){
        t.nonNull.string('email')
        t.nonNull.string('password')
    }
})

export const login_user = mutationField('login_user', {
    type: nonNull("AuthData"),
    args: {login: nonNull(arg({type: login_user_input}))},
    async resolve(root, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: args.login.email
            }
        })

        if(!user) throw new ApolloError(`User with email: ${args.login.email} does not exist.`)

        const isValidPassword = await compare(args.login.password, user.password)
        
        if(!isValidPassword) throw new ApolloError('Invalid email or password')

        const access_token = generate_token({user_id: user.id}, 'access')

        return {
            access_token,
            user_id: user.id,
            username: user.username
        }
    }
})

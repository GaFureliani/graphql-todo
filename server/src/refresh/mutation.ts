import { GraphQLError } from "graphql";
import { mutationField, objectType } from "nexus";
import { generate_token, verify_token } from "src/helpers/tokens";

const FIVE_DAYS_IN_MS = 1000 * 60 * 60 * 12 * 5

export const RefreshTokenResponse = objectType({
    name: 'RefreshTokenResponse',
    definition(t){
        t.nonNull.string('access_token')
    }
})

export const refresh_token = mutationField('refresh_token', {
    type: "RefreshTokenResponse",
    async resolve(_, __, ctx){
        const refresh_token = ctx.req.cookies.refresh_token

        console.log(ctx.req.cookies)

        const user_token = verify_token(refresh_token, 'refresh')
        if(!user_token) {
            throw new GraphQLError('Invalid refresh token')
        }

        const user = await ctx.prisma.user.findUnique({
            where: {
                id: user_token.user_id
            },
            select: {
                id: true
            }
        })

        if(!user) throw new GraphQLError("Token refresh failed: User not found.")

        const new_access_token = generate_token('access', {user_id: user.id})
        const new_refresh_token = generate_token('refresh', {user_id: user.id})

        ctx.res.cookie('refresh', new_refresh_token, {
            httpOnly: true,
            expires: new Date(Date.now() + FIVE_DAYS_IN_MS),
        })

        return {
            access_token: new_access_token
        }
    }
})
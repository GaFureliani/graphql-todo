import { ApolloServer } from 'apollo-server'
import { schema } from 'src/graphql/schema'
import { context } from './graphql/context'
import { environment } from './helpers/environment'
import dotenv from 'dotenv'
dotenv.config()

const env_vars = environment()
export const server = new ApolloServer({ 
    schema,
    debug:false,
    context,
    csrfPrevention: true,
    cache: 'bounded'
})

if(!env_vars.ACCESS_TOKEN_SECRET) {
    throw new Error("Please set the environment variable \"ACCESS_TOKEN_SECRET\" to some value")
}

if(!env_vars.REFRESH_TOKEN_SECRET) {
    throw new Error("Please set the environment variable \"REFRESH_TOKEN_SECRET\" to some value")
}

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
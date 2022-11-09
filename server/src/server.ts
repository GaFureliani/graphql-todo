import { Context, context } from './graphql/context'
import dotenv from 'dotenv'
import { schema } from './graphql/schema'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import cookieParser from 'cookie-parser'

dotenv.config()

async function start_apollo_server () {
  const app = express()
  const http_server = http.createServer(app)
  const server = new ApolloServer<Context>({
    context,
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server }), ApolloServerPluginLandingPageLocalDefault({
      footer: false,
      embed: true,
      includeCookies: true
    })]
  })
  await server.start()
  app.use(cookieParser())

  server.applyMiddleware({ app, cors: { origin: ['http://localhost:5173'], credentials: true } })
  await new Promise<void>((resolve) => http_server.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
void start_apollo_server()

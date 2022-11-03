import { Context, context } from './graphql/context'
import { environment } from './helpers/environment'
import dotenv from 'dotenv'
import { schema } from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config()

const env_vars = environment()

if(!env_vars.ACCESS_TOKEN_SECRET) {
    throw new Error("Please set the environment variable \"ACCESS_TOKEN_SECRET\" to some value")
}

if(!env_vars.REFRESH_TOKEN_SECRET) {
  throw new Error("Please set the environment variable \"REFRESH_TOKEN_SECRET\" to some value")
}

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<Context>({
    context,
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({
      footer: false,
      embed:true,
      includeCookies: true 
    })],
  });
  await server.start();
  app.use(cookieParser())

  server.applyMiddleware({ app, cors: {origin: ["http://localhost:5173"], credentials: true} });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer()
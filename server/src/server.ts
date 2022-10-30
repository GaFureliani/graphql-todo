import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { Context, context } from './graphql/context'
import { environment } from './helpers/environment'
import dotenv from 'dotenv'
import { schema } from './graphql/schema';
import cookieParser from 'cookie-parser';
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
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
      '/graphql',
      json(),
      cookieParser(),
      cors<cors.CorsRequest>(),
      expressMiddleware(server, { context }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  }
  startApolloServer()
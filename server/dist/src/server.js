"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const schema_1 = require("src/graphql/schema");
const context_1 = require("./graphql/context");
const environment_1 = require("./helpers/environment");
const env_vars = (0, environment_1.environment)();
exports.server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    debug: false,
    context: context_1.context
});
if (env_vars.ACCESS_TOKEN_SECRET) {
    throw new Error("Please set the environment variable \"ACCESS_TOKEN_SECRET\" to some value");
}
if (env_vars.REFRESH_TOKEN_SECRET) {
    throw new Error("Please set the environment variable \"REFRESH_TOKEN_SECRET\" to some value");
}
exports.server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

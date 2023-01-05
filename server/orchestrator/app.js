require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const productResolver = require('./resolvers/productResolver');
const userResolvers = require('./resolvers/userResolver');
const productTypeDefs = require('./schemas/productSchema');
const userTypeDefs = require('./schemas/userSchema');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, productTypeDefs],
  resolvers: [userResolvers, productResolver],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 9090 },
}).then(res => {
  console.log('orchestrator-graphql', res.url);
});

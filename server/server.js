const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();

// Define your schema and resolvers for ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

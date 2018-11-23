const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const resolvers = require ('./resolver/resolvers');
const typeDefs = require('./schema/types');

//connect to MongoDB with mongodb database with moongoose
mongoose.connect('mongodb://localhost/exercise');

//run the server
const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', () => 
server.start(() => console.log('Server is running on localhost:4000')));

//nodemon ./server.js localhost 4000
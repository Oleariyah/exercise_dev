
//define datatype and schema
const typeDefs = `
  type Query {
    hello(name: String): String!
    exercises: [exercise]
  }

  type exercise {
      id: ID!
      title: String!
      description: String!
      muscles: String!
  }

  type Mutation {
    createExercise(title: String!, description: String!, muscles: String! ) : exercise
    updateExercise(id: ID!, title: String!, description: String!) : Boolean
    removeExercise(id: ID!) : Boolean 
}
`

module.exports= typeDefs;

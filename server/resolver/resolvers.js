const exercises = require('../models/exercises');

//resolve function
const resolvers = {
//Query resolver
    Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    exercises: () => exercises.find()
    },

    Mutation: {
       //create a new exercise resolver
        createExercise: async (_, {title, description, muscles}) => {
            const exercise = new exercises({title, description, muscles});
            await exercise.save();
            return exercise;
            },

        //update an exixting todo by ID
        updateExercise: async (_, {id, title, description}) => {
            await exercises.findByIdAndUpdate(id, {title, description});
            return true;
        },

       //delete an existing todo by ID
        removeExercise: async (_, {id}) => {
            await exercises.findByIdAndRemove(id);
            return true;
        }

    }
}

module.exports = resolvers;

const Todo = require('../model/model');

//resolve function
const resolvers = {
//Query resolver
    Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todos: () => Todo.find()
    },

    Mutation: {
       //create a new todo resolver
        createTodo: async (_, {text}) => {
            const todo = new Todo({text, complete:false});
            await todo.save();
            return todo;
            },

        //update an exixting todo by ID
        updateTodo: async (_, {id, complete}) => {
            await Todo.findByIdAndUpdate(id, {complete});
            return true;
        },

       //delete an existing todo by ID
        removeTodo: async (_, {id}) => {
            await Todo.findByIdAndRemove(id);
            return true;
        }

    }
}

module.exports = resolvers;

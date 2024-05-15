//Import required models here

const { User } = require("../model");

//Import auth functions 

const resolvers = {
    Query: {
        //User related queries
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        me: async (parent, {}) => {

        },

        //Process related queries
        findProcesses: async (parent, {}) => {

        },
        findProcess: async (parent, {}) => {

        },

        //Task related queries
        findTasks: async (parent, {}) => {

        },
        findTask: async (parent, {}) => {

        },
        //Profession related queries

        //Company related queries
    },
    Mutation: {
        //User mutation methods
        addUser: async (parent, { email, password, firstName, lastName }) => {
            return User.create({ email, password, firstName, lastName });
        },

        login: async (parent, {email, password}) => {

        },

        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },

        //Process mutation methods
        addProcess: async (parent, {}) => {

        },
        updateProcess: async (parent, {}) => {

        },
        removeProcess: async (parent, {}) => {

        },
        //Task mutation methods
        addTask: async (parent, {}) => {

        },
        removeTask: async (parent, {}) => {
            
        },
        //Profession Mutation methods
        addProfession: async (parent, {}) => {
            
        },
        //Company Mutation methods
        addCompany: async (parent, {}) => {
            
        },
    }
}

module.exports = resolvers
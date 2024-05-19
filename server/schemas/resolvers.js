//Import required models here
const { signToken } = require("../utils/auth");
const { User, Process } = require("../model");

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
        findProcessesGroupedByCategory: async (parent, {}) => {
            try{
                const result = await Process.aggregate([
                {
                    $group: {
                    _id: '$processCategory',
                    processes: { $push: '$$ROOT' }
                    }
                }
            ]);

            

            return result;
            } catch (err) {
                throw new Error(err);
            } 
        },


        // //Task related queries
        // findTasks: async (parent, {}) => {

        // },
        // findTask: async (parent, {}) => {

        // },
        //Profession related queries

        //Company related queries
    },
    Mutation: {
        //User mutation methods
        addUser: async (parent, { email, password, firstName, lastName }) => {
            return User.create({ email, password, firstName, lastName });
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw AuthenticationError
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError
            }
      
            const token = signToken(user);
            return { token, user };
        },

        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw AuthenticationError;
        },

        //Process mutation methods
        addProcess: async (parent, {processTitle, processText, processCategory}, context) => {
            console.log("user", context.user)
            let lastUpdated = new Date();
            let formattedDate = lastUpdated.toDateString();
            return Process.create({processTitle, processText, processCategory, lastUpdated, formattedDate})
        },
        deleteProcess: async (parent, {processId}) => {
            return Process.findOneAndDelete({ _id: processId });
        },
        updateProcess: async (parent, {processId, processTitle, processText, processCategory}) => {
            let lastUpdated = new Date();
            let formattedDate = lastUpdated.toDateString();
            return Process.findOneAndUpdate(
                {_id: processId},
                {
                    processTitle, processText, processCategory, lastUpdated, formattedDate
                },
                {new: true}
            )
        },
        // removeProcess: async (parent, {}) => {

        // },
        // //Task mutation methods
        // addTask: async (parent, {}) => {

        // },
        // removeTask: async (parent, {}) => {
            
        // },
        // //Profession Mutation methods
        // addProfession: async (parent, {}) => {
            
        // },
        // //Company Mutation methods
        // addCompany: async (parent, {}) => {
            
        // },
    }
}

module.exports = resolvers
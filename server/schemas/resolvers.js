//Import required models here
const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Process, Referral, Flag, Company} = require("../model");
const { compare } = require("bcrypt");



const resolvers = {
    Query: {
        //User related queries
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw AuthenticationError;
        },

        //Process related queries
        findProcessesGroupedByCategory: async (parent, {}) => {
     
            try{
                const result = await Process.aggregate([
                {
                    $lookup: {
                    from: 'flags', // The name of the collection to join
                    localField: 'flags', // The field from the Process documents
                    foreignField: '_id', // The field from the Flag documents
                    as: 'populatedFlags' // The name of the output array field
                    }
                },
                {
                    $lookup: {
                        from: 'processes',
                        localField: 'referenceProcesses',
                        foreignField: '_id',
                        as: 'populatedReferenceProcesses'

                    }
                },
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

        getProcesses: async (parent, {}, context) => {
            if(!context.user){
                throw AuthenticationError;
            }

            try {
                //TASK: ADD COMPANY SPECIFIC FILTER
                const processes = await Process.find();
                return processes;
            } catch(error){
                throw new Error(error);
            }
        },

        getProcess: async (parent, {processId}, context) => {
            if(context.user){
                try {
                    return Process.findOne({_id: processId}).populate('flags');
                } catch(error){
                    throw new Error(error);
                }
            }

            throw AuthenticationError
        },

        findFlags: async (parent, {}) => {
            return Flag.find()
        },

        //Referral related queries
        findReferrals: async (parent, {}, context) => {
            if(!context.user) throw AuthenticationError;
        //Flag related queries
            try {
                //q: how can i specify only specifici fields i want from assignedBy?
                //a:
            
                const referrals = await Referral.find({}).populate('assignedBy', {password: 0});
                
      
                return referrals;
            }
            catch (err) {
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
        getCompany: async (parent, {companyId}, context) => {
            return Company.findOne({_id: companyId})
        }
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
        updateUser: async (parent, {imageUrl}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {imageUrl: imageUrl},
                    {new: true}
                );
            }
            throw AuthenticationError;
        },

        //Process mutation methods
        addProcess: async (parent, {processTitle, processText, processCategory, processSubCategory, referenceProcesses}, context) => {
            console.log(referenceProcesses)
            let lastUpdated = new Date();
            let formattedDate = lastUpdated.toDateString();
            return Process.create({processTitle, processText, processCategory, lastUpdated, formattedDate, processSubCategory, referenceProcesses})
        },
        deleteProcess: async (parent, {processId}) => {
            const result = await Process.findOneAndDelete({ _id: processId });
            console.log(result)
            console.log(result.flags.length)
            //If there are flags referenced within this process, delete them
                for(const flagId of result.flags){
                    const flag = await Flag.findOneAndDelete({_id: flagId});
                }

            return result;
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
        //Flag mutations
        addFlag: async (parent, {flagText, referenceProcess}, context) => {
                //Create a Flag with process reference
                let currentDate = new Date();
                let formattedDate = currentDate.toDateString();
                let result = await Flag.create({flagText, postedBy: context.user._id , referenceProcess, formattedDate})

                //Add flag ID to process 
                if(referenceProcess){
                    let process = await Process.findOneAndUpdate(
                        {_id: referenceProcess},
                        {$addToSet: {flags: result._id}},
                        {new: true})
                }
                return result;
        },
        removeFlag: async (parent, {flagId}, context) => {
                let result = await Flag.findOneAndDelete({_id: flagId})

                //If this flag references a process, delete the reference from process
                if(result.referenceProcess){
                    let removeProcess = await Process.findOneAndUpdate(
                        {_id: result.referenceProcess},
                        {$pull: {flags: result._id}},
                        {new: true})
                }

                return result;
        },
        // removeProcess: async (parent, {}) => {

        // },
        // Referal Mutations
        // type Referral {
        //     _id: ID!
        //     title: String!
        //     desc: String!
        //     status: String!
        //     company: ID!
        //     assignedBy: ID!
        //     dateCreated: String
        //     dateCompleted: String
        //     priority: String
        //     completionNotes: String
        //     relatedProcesses: [ID]
        // }
        addReferral: async (parent, { title, desc, priority, relatedProcesses }, context) => {
            if(!context.user){
                throw AuthenticationError;
            }
            // console.log(`Title: ${title}, Desc: ${desc}, Priority: ${priority}, Related Processes: ${relatedProcesses}`)
            // console.log("User", context.user)
            try {
                const newReferral = await Referral.create({
                    title, 
                    desc, 
                    priority, 
                    relatedProcesses, 
                    
                    assignedBy: context.user._id
                    //will need to implement current Company too                    
                });

                return newReferral;
            } catch (err) {
                console.log(err)
                throw new Error(err);
            }
        },

        completeReferral: async (parent, { referralId, completionNotes }, context) => {

            if(!context.user){
                throw AuthenticationError;
            }

            try {

                return await Referral.findOneAndUpdate( { _id: referralId }, 
                    { status: 'complete', completionNotes, dateCompleted: new Date()}, 
                    {new: true});

            } catch(err) {
                throw new Error(err);
            }
        },

        inprogressReferral: async (parent, { referralId, completionNotes }, context) => {

            if(!context.user){
                throw AuthenticationError;
            }

            try {

                return await Referral.findOneAndUpdate( { _id: referralId }, 
                    { status: 'inprogress', completionNotes }, 
                    {new: true});

            } catch(err) {
                throw new Error(err);
            }
        },




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
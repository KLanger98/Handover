//Import required models here
const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Process, Referral, Flag, Company} = require("../model");


const resolvers = {
    Query: {
        //User related queries
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        getUser: async (parent, {},  context) => {
            if(!context.user) throw AuthenticationError;
            
            const { password, ...userWithoutPassword }   = context.user;
            return userWithoutPassword;
        },
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id})
            }
        },

        //Process related queries
        findProcessesGroupedByCategory: async (parent, args, context) => {
            try{
                const result = await Process.aggregate([
                {
                    $match: {
                        company: context.user.company
                    }
                },
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
                const processes = await Process.find( { company: context.user.company });
                return processes;
            } catch(error){
                throw new Error(error);
            }
        },

        getProcess: async (parent, {processId}, context) => {
            if(context.user){
                try {
                    return Process.findOne({_id: processId, company: context.user.company}).populate('flags').populate('referenceProcesses');
                } catch(error){
                    throw new Error(error);
                }
            }

            throw AuthenticationError
        },

        findFlags: async (parent, args, context) => {
            return Flag.find({company: context.user.company})
        },

        //Referral related queries
        findReferrals: async (parent, {}, context) => {
            if(!context.user) throw AuthenticationError;
        //Flag related queries
            try {
                //q: how can i specify only specifici fields i want from assignedBy?
                //a:
            
                const referrals = await Referral.find({ company: context.user.company }).populate('assignedBy', {password: 0});
                
      
                return referrals;
            }
            catch (err) {
                throw new Error(err);
            }
        },

        findReferralWithProcesses: async (parent, { referralId }, context) => {

            // if(!context.user) throw AuthenticationError;

            try {
                const referral = await Referral.findById({ _id: referralId, company: context.user.company }).populate('relatedProcesses');
          
                return referral;
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
        getCompany: async (parent, args, context) => {
            return Company.findOne({_id: context.user.company}).populate('companyModerators').populate('companyUsers')
        }
    },
    Mutation: {
        //User mutation methods
        addUser: async (parent, { email, password, firstName, lastName, profession, contactNumber }, context) => {
            console.log(email, password, firstName, lastName, profession)
            const user = await User.create({ email, password, firstName, lastName, moderator: false, company: context.user.company, profession, contactNumber });
            
            console.log(user._id)

            const updateCompany = await Company.findOneAndUpdate(
                {_id: context.user.company},
                {$addToSet: {companyUsers: user._id}}
            )

            return user;
        },

        createCompanyAndUser: async (parent, {email, password, firstName, lastName, companyName}) => {
            const user = await User.create({email, password, firstName, lastName, moderator: true});

            const userId = user._id
            const company = await Company.create({companyName, companyModerators: [userId]});
            const companyId = company._id

            user.company = companyId;

            await user.save();

            return user;
        },

        login: async (parent, {email, password}) => {
    
            email = typeof email === 'string' ? email.trim().toLowerCase() : '';
                
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
            if (context.user) throw AuthenticationError;

            //remove user from the company

            return User.findOneAndDelete({ _id: context.user._id, company: context.user.company });
        },
        removeUserAccount: async (parent, {userId}, context) => {
            //Determine is user commencing delete is authenticated
            if(!context.user) {
                throw AuthenticationError
            }
            const user = await User.findOneAndDelete({_id: userId, company: context.user.company})
            //Remove the user from the company
            const company = await Company.findOneAndUpdate(
                {_id: context.user.company},
                {$pull: {companyUsers: userId}},
            )
            console.log(company)

            //Delete the user profile
            return company
        },
        updateUser: async (parent, {imageUrl}, context) => {

            //TASK: if company change deal with that here

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
            let company = context.user.company
            let lastUpdated = new Date();
            let formattedDate = lastUpdated.toDateString();
            return Process.create({processTitle, processText, processCategory, lastUpdated, formattedDate, processSubCategory, referenceProcesses, company})
        },
        deleteProcess: async (parent, {processId}, context ) => {
            const result = await Process.findOneAndDelete({ _id: processId, company: context.user.company });
            console.log(result)
            console.log(result.flags.length)
            //If there are flags referenced within this process, delete them
                for(const flagId of result.flags){
                    const flag = await Flag.findOneAndDelete({_id: flagId});
                }

            return result;
        },
        updateProcess: async (parent, {processId, processTitle, processText, processCategory, referenceProcesses}) => {
            let lastUpdated = new Date();
            let formattedDate = lastUpdated.toDateString();
            try{
                return Process.findOneAndUpdate(
                {_id: processId},
                {
                    processTitle, processText, processCategory, lastUpdated, formattedDate, referenceProcesses
                },
                {new: true}
            )
            } catch(error){
                console.error(error);
            }
            
        },
        //Flag mutations
        addFlag: async (parent, {flagText, referenceProcess}, context) => {
                //Create a Flag with process reference
          
                let currentDate = new Date();
                let formattedDate = currentDate.toDateString();
                let result = await Flag.create({flagText, postedBy: context.user._id , referenceProcess, formattedDate, company: context.user.company})

                //Add flag ID to process 
                if(referenceProcess){
                    let process = await Process.findOneAndUpdate(
                        {_id: referenceProcess, company: context.user.company},
                        {$addToSet: {flags: result._id}},
                        {new: true})
                }
                return result;
        },
        
        removeFlag: async (parent, {flagId}, context) => {
                let result = await Flag.findOneAndDelete({_id: flagId, company: context.user.company})

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
            if(!context.user) throw AuthenticationError;


            // console.log("User", context.user)
            try {
                const processes = await Process.find({
                    _id: { $in: relatedProcesses }
                  });

                
                const newReferral = await Referral.create({
                    title, 
                    desc, 
                    priority, 
                    relatedProcesses: processes, 
                    assignedBy: context.user._id,
                    company: context.user.company,             
                });

                return newReferral;
            } catch (err) {
                console.log(err)
                throw new Error(err);
            }
        },

        deleteReferral: async (parent, { referralId }, context) => {
            if(!context.user) throw AuthenticationError;
            
            try {
                return await Referral.findOneAndDelete({ _id: referralId, company: context.user.company });
            } catch (err) {
                throw new Error(err);
            }
        },

        completeReferral: async (parent, { referralId, completionNotes }, context) => {

            if(!context.user){
                throw AuthenticationError;
            }

            try {

                return await Referral.findOneAndUpdate( { _id: referralId, company: context.user.company }, 
                    { status: 'completed', completionNotes, dateCompleted: new Date()}, 
                    {new: true});

            } catch(err) {
                throw new Error(err);
            }
        },

        inprogressReferral: async (parent, { referralId, completionNotes }, context) => {

            if(!context.user) throw AuthenticationError;


            try {

                return await Referral.findOneAndUpdate( { _id: referralId, company: context.user.company }, 
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
        //Company Mutation methods

        updateCompany: async (parent, {companyDescription, companyAddress, companyImage, dashboardText, companyMap}, context ) => {
            console.log('hi')
            return Company.findOneAndUpdate(
                {_id: context.user.company},
                {
                    companyDescription, companyAddress, companyImage, dashboardText, companyMap
                },
                {new: true}
            )
        }
    }
}

module.exports = resolvers
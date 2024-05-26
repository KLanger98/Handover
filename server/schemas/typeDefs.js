const typeDefs = `
    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        fullName: String
        userProfession: [ID]
        company: ID
        imageUrl: String
    }

    type CategoryGroup {
        _id: String
        processes: [Process]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Process {
        _id: ID!
        processTitle: String!
        processText: String!
        processCategory: String!
        processSubCategory: String!
        formattedDate: String
        flags: [Flag]
        populatedFlags: [Flag]
        referenceProcesses: [Process]
        populatedReferenceProcesses: [Process]
    }
    type Referral {
        _id: ID!
        title: String!
        desc: String!
        status: String!
        company: ID
        assignedBy: User!
        dateCreated: String
        dateCompleted: String
        priority: String
        completionNotes: String
        relatedProcesses: [Process]
    }

    type Flag {
        _id: ID!
        flagText: String!
        referenceProcess: ID
        postedBy: ID
        dateCreated: String
        formattedDate: String
    }

    type Task {
        _id: ID!
        taskTitle: String!
        taskText: String!
        referenceProcesses: [ID]
    }

    type Company {
        _id: ID!
        companyName: String!
        companyAddress: String
        companyProcesses: [ID]
        companyModerators: [ID]!
        companyUsers: [ID]
    }

    type Profession {
        _id: ID!
        professionName: String!
        company: ID!
    }

    type Query {
        user(user: ID!): User
        users: [User]!
        me: User

        getProcesses: [Process]
        getProcess(processId: String!): Process
        findProcessesGroupedByCategory: [CategoryGroup]

        findReferrals: [Referral]
        findReferralWithProcesses(referralId: String!): Referral
        
        findFlags: [Flag]

        getCompany: Company

    }

    type Mutation{
        addUser(email: String!, password: String!, firstName: String!, lastName: String!): User
        login(email: String!, password: String!): Auth
        removeUser: User
        updateUser(imageUrl: String): User
        createCompanyAndUser(email: String!, password: String!, firstName: String!, lastName: String!, companyName: String!): User

        addProcess(processTitle: String!, processText: String!, processCategory: String!, processSubCategory: String!, referenceProcesses: [ID]): Process
        deleteProcess(processId: ID!): Process
        updateProcess(processId: ID!, processTitle: String!, processText: String!, processCategory: String!, processSubCategory: String!): Process

        addFlag(flagText: String!, referenceProcess: ID): Flag
        removeFlag(flagId: ID!): Flag

        addReferral(title: String!, desc: String!, priority: String, relatedProcesses: [ID]): Referral
        deleteReferral(referralId: ID!): Referral
        completeReferral(referralId: ID!, completionNotes: String): Referral
        inprogressReferral(referralId: ID!, completionNotes: String): Referral

    }

    

`
module.exports = typeDefs;

// addProcess(): Process
//         updateProcess(): Process
//         removeProcess(): Process

//         addTask(): Task
//         removeTask(): Task

//         addProfession(): Profession

//         addCompany(): Company
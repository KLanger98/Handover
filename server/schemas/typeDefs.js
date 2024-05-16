const typeDefs = `
    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        userProfession: [ID]
        company: [ID]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Process {
        _id: ID!
        processTitle: String!
        processText: String!
        category: String
        referenceProcesses: [ID]
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
        companyAddress: String!
        companyProcesses: [ID]
        companyModerators: [ID]
        companyUsers: [ID]
    }

    type Profession {
        _id: ID!
        professionName: String!
        company: ID!
    }

    type Query {
        user(user: ID!): User
        users: [User]
        me: User
    }

    type Mutation{
        addUser(email: String!, password: String!, firstName: String!, lastName: String!): User
        login(email: String!, password: String!): Auth
        removeUser: User
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
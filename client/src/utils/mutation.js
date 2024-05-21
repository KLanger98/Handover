import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        userProfession
        company
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation Mutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      _id
      email
      password
      firstName
      lastName
      userProfession
      company
    }
  }
`;

export const ADD_PROCESS = gql`
mutation addProcess($processTitle: String!, $processText: String!, $processCategory: String!, $processSubCategory: String!) {
  addProcess(processTitle: $processTitle, processText: $processText, processCategory: $processCategory, processSubCategory: $processSubCategory) {
    processTitle
  }
}
`

export const DELETE_PROCESS = gql`
  mutation Mutation($processId: ID!) {
  deleteProcess(processId: $processId) {
    _id
    processCategory
    processText
    processTitle
  }
}
`
export const UPDATE_PROCESS = gql`
  mutation Mutation($processId: ID!, $processTitle: String!, $processText: String!, $processCategory: String!) {
    updateProcess(processId: $processId, processTitle: $processTitle, processText: $processText, processCategory: $processCategory) {
      _id
      processCategory
      processText
      processTitle
    }
  }
`





// REFERRALS

export const ADD_REFERRAL = gql`
mutation Mutation($title: String!, $desc: String!, $priority: String, $relatedProcesses: [ID]) {
  addReferral(title: $title, desc: $desc, priority: $priority, relatedProcesses: $relatedProcesses) {
    _id
    title
    desc
    status
    company
    assignedBy
    dateCreated
    dateCompleted
    priority
    completionNotes
    relatedProcesses
  }
}
`
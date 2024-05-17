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
mutation addProcess($processTitle: String!, $processText: String!, $processCategory: String!) {
  addProcess(processTitle: $processTitle, processText: $processText, processCategory: $processCategory) {
    processTitle
  }
}
`

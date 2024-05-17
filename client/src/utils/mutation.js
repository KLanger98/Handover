import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        email
        username
      }
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

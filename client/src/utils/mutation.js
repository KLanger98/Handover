import { gql } from '@apollo/client';

//User related mutations
export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        profession
        company
        moderator
      }
    }
  }
`;



export const CREATE_USER = gql`
mutation Mutation($email: String!, $password: String!, $firstName: String!, $lastName: String!, $profession: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, profession: $profession) {
      _id
      email
      password
      firstName
      lastName
      profession
      company
    }
  }
`;

export const CREATE_USER_AND_COMPANY = gql`
  mutation Mutation($email: String!, $password: String!, $firstName: String!, $lastName: String!, $companyName: String!) {
    createCompanyAndUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, companyName: $companyName) {
      _id
      company
      email
      firstName
      fullName
      lastName
    }
  }

`

export const UPDATE_USER = gql`
  mutation Mutation($imageUrl: String) {
    updateUser(imageUrl: $imageUrl) {
      _id
      imageUrl
    }
  }
`


//Process related mutations
export const ADD_PROCESS = gql`
mutation addProcess($processTitle: String!, $processText: String!, $processCategory: String!, $processSubCategory: String!, $referenceProcesses: [ID]) {
  addProcess(processTitle: $processTitle, processText: $processText, processCategory: $processCategory, processSubCategory: $processSubCategory, referenceProcesses: $referenceProcesses) {
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
//FLAGS
export const ADD_FLAG = gql`
  mutation Mutation($flagText: String!, $referenceProcess: ID) {
    addFlag(flagText: $flagText, referenceProcess: $referenceProcess) {
      _id
      flagText
      postedBy
      referenceProcess
      dateCreated
    }
  }
`

export const DELETE_FLAG = gql`
  mutation Mutation($flagId: ID!) {
    removeFlag(flagId: $flagId) {
      _id
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
      dateCreated
      priority
      relatedProcesses {
        _id
      }
    }
  }
`

export const DELETE_REFERRAL = gql`
  mutation Mutation($referralId: ID!) {
    deleteReferral(referralId: $referralId) {
      _id
      title
      desc
      status
      company
      dateCreated
      dateCompleted
      priority
      completionNotes
    }
  }
`

export const COMPLETE_REFERRAL = gql`
  mutation Mutation($referralId: ID!, $completionNotes: String) {
    completeReferral(referralId: $referralId, completionNotes: $completionNotes) {
      _id
      title
      desc
      status
      company
      dateCreated
      dateCompleted
      priority
      completionNotes
      relatedProcesses {
        _id
      }
    }
  }
`

export const INPROGRESS_REFERRAL = gql`
  mutation Mutation($referralId: ID!, $completionNotes: String) {
    inprogressReferral(referralId: $referralId, completionNotes: $completionNotes) {
      _id
      title
      desc
      status
      company
      dateCreated
      dateCompleted
      priority
      completionNotes
      relatedProcesses {
        _id
      }
    }
  }
`

//Company mutations
export const UPDATE_COMPANY = gql`
mutation Mutation($companyDescription: String, $companyImage: String, $companyAddress: String) {
  updateCompany(companyDescription: $companyDescription, companyImage: $companyImage, companyAddress: $companyAddress) {
    _id
    companyAddress
    companyName
    companyImage
  }
}
`
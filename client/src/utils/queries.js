import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  query Query {
    me {
      _id
      email
      firstName
      lastName
      fullName
      profession
      company
      imageUrl
      initials
      moderator
    }
  }
`

export const SIGNINS = gql`
    query Query {
        getSignIns{
        _id
        date
        user {
            _id
            fullName
            imageUrl
        }
        }
    }
`

export const QUERY_PROCESSES_GROUPED = gql`
    query Query {
        findProcessesGroupedByCategory {
            _id
            processes {
                populatedFlags {
                    _id
                    flagText
                    postedBy
                    referenceProcess
                    formattedDate
                }
                _id
                formattedDate
                processCategory
                processSubCategory
                processText
                processTitle
                populatedReferenceProcesses{
                    _id
                    processTitle
                }
            }
        }
    }
`

export const QUERY_PROCESSES = gql`
    query GetProcesses {
        getProcesses {
        _id
        processTitle
        processText
        processCategory
        processSubCategory
        formattedDate
        }
    }
`

export const QUERY_SINGLE_PROCESS = gql`
    query Query($processId: String!) {
        getProcess(processId: $processId) {
            _id
            formattedDate
            processCategory
            flags{
                _id
                flagText
                formattedDate
            }
            processSubCategory
            processText
            processTitle
            referenceProcesses{
                _id
                processTitle
            }
        }
    }
`

export const QUERY_PROCESSES_SIMPLE = gql`
    query GetProcesses {
        getProcesses {
        _id
        processTitle
        }
    }
`

export const QUERY_REFERRALS = gql`
query FindReferrals {
    findReferrals {
    _id
    title
    desc
    status
    company
    assignedBy {
        _id
        initials
        fullName
    }
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

export const QUERY_REFERRAL_INC_PROCESSES = gql`
    query GetProcesses($referralId: String!) {
        findReferralWithProcesses(referralId: $referralId) {
        _id
        title
        desc
        status
        company
        assignedBy {
            fullName
            initials
            imageUrl
        }
        dateCreated
        dateCompleted
        priority
        completionNotes
        relatedProcesses {
            processTitle
            _id
        }
        }
    }
`

  export const QUERY_FLAGS = gql`
    query Query {
        findFlags {
            _id
            flagText
            postedBy
            referenceProcess
        }
    }
  `

  //Company Queries
    export const QUERY_SINGLE_COMPANY = gql`
        query Query {
            getCompany {
                _id
                companyAddress
                companyImage
                companyDescription
                companyModerators{
                    _id
                    firstName
                    lastName
                    profession
                    initials
                    imageUrl
                    fullName
                    contactNumber
                }
                companyName
                companyProcesses
                companyUsers{
                    _id
                    firstName
                    profession
                    lastName
                    initials
                    imageUrl
                    fullName
                    contactNumber
                }
                dashboardText
                companyMap
            }
        }
    `
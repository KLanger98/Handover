import { gql } from '@apollo/client';


export const QUERY_ME = gql`
    query me {
        me{
        _id
        username
        email
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
        }
    }
  
`

export const QUERY_PROCESSES_GROUPED = gql`
    query Query {
        findProcessesGroupedByCategory {
            _id
            processes {
            flags
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
        fullName
    }
    dateCreated
    dateCompleted
    priority
    completionNotes
    relatedProcesses
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

import { gql } from '@apollo/client';


export const QUERY_ME = gql`
    query Query {
        me {
            _id
            email
            company
            firstName
            fullName
            imageUrl
            lastName
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

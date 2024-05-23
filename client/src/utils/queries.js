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
        processes {
            _id
            processCategory
            processText
            processTitle
            formattedDate
        }
        _id
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
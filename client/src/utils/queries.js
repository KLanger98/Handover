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

export const QUERY_COMPANY_PROCESSES = gql`
    query Query {
        findProcesses {
            processTitle
            processText
            processCategory
        }
    }
`
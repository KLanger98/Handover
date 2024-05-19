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
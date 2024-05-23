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
                processSubCategory
                flags
                populatedFlags {
                    _id
                    dateCreated
                    flagText
                    postedBy
                    referenceProcess
                }
            }
            _id
        }
    }
  `

  export const QUERY_FLAGS = gql`
    query Query {
        findFlags {
            _id
            dateCreated
            flagText
            postedBy
            referenceProcess
        }
    }
  `
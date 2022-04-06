import { gql } from '@apollo/client';

const RETURN_BOOK = gql`
  mutation ReturnBook($bookId: ID!) {
    returnBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
const RENT_BOOK = gql`
  mutation RentBook($bookId: ID!) {
    rentBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
const PROCESS_BOOK = gql`
  mutation ProcessBook($bookId: ID!) {
    processBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
export { RETURN_BOOK, RENT_BOOK, PROCESS_BOOK };

import { gql } from '@apollo/client';

const RETURN_BOOK = gql`
  mutation ReturnBook($bookId: ID!) {
    returnBook(bookId: $bookId) {
      ... on Success {
        id
      }

      ... on MissingPermissionsError {
        msg
      }

      ... on Error {
        msg
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

      ... on MissingPermissionsError {
        msg
      }

      ... on Error {
        msg
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

      ... on MissingPermissionsError {
        msg
      }

      ... on Error {
        msg
      }
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($bookData: BookData) {
    createBook(bookData: $bookData) {
      ... on Success {
        id
      }

      ... on MissingPermissionsError {
        msg
        requiredPermsInt
      }

      ... on Error {
        msg
      }
    }
  }
`;

export { RETURN_BOOK, RENT_BOOK, PROCESS_BOOK, CREATE_BOOK };

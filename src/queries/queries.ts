import { gql } from '@apollo/client';

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      _id
      name
      tags
      rentable {
        dueDate
        stateTags
        rentedDate
      }
      media {
        contentTags
        tagline
        publishedDate
        contentDesc
      }
    }
  }
`;
const GET_SHELF = gql`
  query GetShelf {
    getShelf {
      children {
        _id
        name
        tags

        rentable {
          dueDate
          stateTags
          rentedDate
        }

        media {
          contentTags
          tagline
          publishedDate
          contentDesc
        }
      }
    }
  }
`;
const GET_RETURN_BOX = gql`
  query GetReturnBox {
    getReturnBox {
      children {
        _id
        name
        tags
        rentable {
          dueDate
          stateTags
          rentedDate
        }
        media {
          contentTags
          tagline
          publishedDate
          contentDesc
        }
      }
    }
  }
`;
const GET_USER_BOOKS = gql`
  query GetUserBooks($email: String!) {
    getUser(email: $email) {
      children {
        _id
        name
        tags
        rentable {
          dueDate
          stateTags
          rentedDate
        }
        media {
          contentTags
          tagline
          publishedDate
          contentDesc
        }
      }
    }
  }
`;

export { GET_BOOK, GET_SHELF, GET_RETURN_BOX, GET_USER_BOOKS };

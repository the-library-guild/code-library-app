import { gql } from "@apollo/client";

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
const GET_BOOKS = gql`
  query GetBooks {
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
export { GET_BOOK, GET_BOOKS };

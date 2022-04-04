import { gql, useMutation } from "@apollo/client";

const RENT_BOOK = gql`
  mutation RentBook($bookId: ID!) {
    rentBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;

export function useRentBook(bookId: string) {
  const [rentBook, _] = useMutation(RENT_BOOK, {
    variables: { bookId },
  });

  return rentBook;
}

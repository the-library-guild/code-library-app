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

export function useRentBook() {
  const [rentBook, { loading, error }] = useMutation(RENT_BOOK);

  return { rentBook, loading, error };
}

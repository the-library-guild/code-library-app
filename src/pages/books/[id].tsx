import React from "react";
import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

import { Perm } from "code-library-perms";

import { Content } from "../../layout/Content";
import { InternalPage } from "../../layout/InternalPage";
import { FullPageSpinner } from "../../components/FullPageSpinner";
import { BookCard } from "../../components/Booklist/BookCard";

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
function BookDetailedPage() {
  const { query } = useRouter();

  const bookId = query.id as string;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  const book = data?.getBook;

  if (loading) return <FullPageSpinner />;

  return (
    <InternalPage>
      <Content px={4}>
        <Stack w={"100%"} spacing={4} mt={4}>
          {error ? (
            <h1>Could not find requested book</h1>
          ) : (
            <BookCard book={book} isExpanded={true} />
          )}
        </Stack>
      </Content>
    </InternalPage>
  );
}
BookDetailedPage.permissions = Perm.VIEW_BOOKS;

export default BookDetailedPage;

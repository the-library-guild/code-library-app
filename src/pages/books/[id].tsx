import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { Perm } from "code-library-perms";

import { Content } from "../../layout/Content";
import { InternalPage } from "../../layout/InternalPage";
import { FullPageSpinner } from "../../components/FullPageSpinner";
import { BookCard } from "../../components/BookCard/BookCard";
import { Book } from "../../components/BookCard";

import { GET_BOOK } from "../../queries/queries";

function reduceContent(loading: boolean, error: any, book: Book) {
  if (loading) return <FullPageSpinner />;
  if (error) return <div>Could not find requested book</div>;

  return <BookCard book={book} isExpanded={true} />;
}

function BookDetailedPage() {
  const { query } = useRouter();

  const bookId = query.id as string;

  const { loading, error, data, refetch } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  useEffect(() => {
    window.addEventListener("updateBookList", (e) => {
      e.stopPropagation();
      refetch();
    });
  }, []);

  return (
    <InternalPage>
      <Content>
        <Stack spacing={6} wordBreak="break-all" width="100%">
          {reduceContent(loading, error, data?.getBook)}
        </Stack>
      </Content>
    </InternalPage>
  );
}
BookDetailedPage.permissions = Perm.VIEW_BOOKS;

export default BookDetailedPage;

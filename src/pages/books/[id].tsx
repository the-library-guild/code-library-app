import React from "react";

import { Heading, Stack } from "@chakra-ui/react";

import { gql, useQuery } from "@apollo/client";

import { Perm } from "code-library-perms";

import { Content } from "../../layout/Content";
import { InternalPage } from "../../layout/InternalPage";
import { useRouter } from "next/router";
import { BookCard } from "../../components/Booklist/BookCard";
import { FullPageSpinner } from "../../components/FullPageSpinner";

const GET_BOOK = (bookId: string) => {
  return gql`
    query GetBook {
      getBook(bookId: "${bookId}") {
        _id
        name
        tags
        rentable {
          dueDate
          stateTags
          rentedDate
        }
      }
  }
  `
}

function BookDetailedPage() {
  const { query } = useRouter();
  const bookId = query.id as string;

  console.log(`
  query GetBook {
    getBook(bookId: "${bookId}") {
      _id
      name
      tags
      rentable {
        dueDate
        stateTags
        rentedDate
      }
    }
}
`);

  const { loading, error, data } = useQuery(GET_BOOK(bookId));

  if (loading) return <FullPageSpinner />;

  if (error) return <h1>Leave me alone!</h1>;

  console.log(data);

  const book = data?.getBook;

  if (!book) return <h1>Weird...</h1>

  return (
    <InternalPage>
      <Content px={4}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{query.id}</Heading>
          <BookCard book={book}/>
        </Stack>
      </Content>
    </InternalPage>
  );
}

BookDetailedPage.permissions = Perm.VIEW_BOOKS;

export default BookDetailedPage;

// TODO: fix books not displaying tagline
// TODO: speed up book search (re-implement debouncing :P)

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";

import { Perm } from "code-library-perms";

import { InternalPage } from "../layout/InternalPage";
import { Book } from "../components/BookCard";
import { Content } from "../layout/Content";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { useSearch } from "../components/Search/use-search.hook";
import { SearchBox } from "../components/Search/SearchBox";
import { BookCard } from "../components/BookCard/BookCard";
import { GET_SHELF, GET_RETURN_BOX } from "../queries/queries";
import { useInterval } from "../components/BookCard/use-interval.hook";

function reduceContent(
  loading: boolean,
  error: any,
  books: Book[],
  maxIdx: number
) {
  if (loading) return <FullPageSpinner />;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if (!books?.length) return <div>Could not find any match :(</div>;

  return books
    .slice(0, maxIdx)
    .map((book) => <BookCard key={book?._id} book={book} />);
}

const containerOptions = {
  shelf: {
    label: "📚 Books on the Shelf",
    query: GET_SHELF,
  },
  returnBox: {
    label: "📥 Books in the Return Box",
    query: GET_RETURN_BOX,
  },
  user: { label: "🤓 Books you're borrowing", query: GET_SHELF },
};

function IndexPage() {
  const [query, setQuery] = useState<any>(containerOptions.shelf.query);

  const { loading, error, books, searchTerm, setSearchTerm, refetch } =
    useSearch(query);

  const [maxIdx, setMaxIdx] = useState(10);

  useInterval(() => {
    if (maxIdx > books.length && books.length !== 0) return;

    setMaxIdx((prev) => prev + 10);
  }, 500);

  return (
    <InternalPage>
      <Content>
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={(term: string) => {
              setMaxIdx(10);
              setSearchTerm(term);
            }}
            containerOptions={containerOptions}
            setQuery={(value: any) => {
              setQuery(value);
              refetch();
              console.log("refetchin'");
            }}
          />
          <h2>{books.length} Results</h2>
          {reduceContent(loading, error, books, maxIdx)}
        </Stack>
      </Content>
    </InternalPage>
  );
}
IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;

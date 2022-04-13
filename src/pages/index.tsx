// TODO: speed up book search (re-implement debouncing :P)

import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Book } from '../components/BookCard/BookCard.constants';
import { Content } from '../components/Content';
import { FullPageSpinner } from '../components/FullPageSpinner';
import { useSearch } from '../components/Search/use-search.hook';
import { SearchBox } from '../components/Search/SearchBox';
import { BookCard } from '../components/BookCard/BookCard';
import { GET_SHELF } from '../queries/queries';
import { useInterval } from '../hooks/use-interval.hook';

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
export interface ContainerOption {
  label: string;
  query: any;
  options?: { [key: string]: any };
}

function IndexPage() {
  const { loading, error, books, searchTerm, setSearchTerm, refetch } =
    useSearch(GET_SHELF, {});

  const [maxIdx, setMaxIdx] = useState(10);

  useInterval(() => {
    if (maxIdx > books.length && books.length !== 0) return;

    setMaxIdx((prev) => prev + 10);
  }, 500);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={(term: string) => {
            setMaxIdx(10);
            setSearchTerm(term);
          }}
        />
        <Text fontSize={'sm'}>Results ({books.length})</Text>
        <Stack spacing={6} wordBreak="break-all" width="100%">
          {reduceContent(loading, error, books, maxIdx)}
        </Stack>
      </Stack>
    </Content>
  );
}

IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;

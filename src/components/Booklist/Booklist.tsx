import {
  Stack,
  Heading,
} from "@chakra-ui/react";

import { Content } from "../../layout/Content";

import { FullPageSpinner } from "../FullPageSpinner";

import { BookCard } from "./BookCard";

import { useGetShelf } from "./Booklist.hook";

export function Booklist() {
  const { loading, error, books } = useGetShelf();

  if (loading) return <FullPageSpinner />;

  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <Content>
      <Stack spacing={6} py={20} px={8} wordBreak={"break-all"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>All Books</Heading>
        </Stack>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Stack>
    </Content>
  );
}

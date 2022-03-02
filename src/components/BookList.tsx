import {
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber
} from "@chakra-ui/react";
import { Content } from "../layout/Content";

interface Book {
  _id: string;
  name: string;
  rentable: {
    ownershipStateTags: string[];
  };
  media: {
    contentTags: string[];
    subTitle: string;
    publishedDate: Date;
    contentDesc: string;
  };
}

interface BookListProps {
  books: Book[];
}

const shorten = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}


export function BookList({ books }: BookListProps) {
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

function BookCard({ book }: CardProps) {
  const { rentable: { ownershipStateTags } } = book;

  const bookIsAvailable = ownershipStateTags.includes("Available");

  return bookIsAvailable ? <AvailableBookCard book={book} /> : <NonAvailableBookCard book={book} />
}

interface CardProps {
  book: Book;
}

const NonAvailableBookCard = ({ book }: CardProps) => {
  const { name, media } = book;

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={3}
    >
      <Stat>
        <StatLabel>PM</StatLabel>
        <StatNumber>{name}</StatNumber>
        <StatHelpText>{shorten(media.subTitle, 100)}</StatHelpText>
        <StatHelpText color={useColorModeValue("red.800", "red.300")}>Not Available</StatHelpText>
      </Stat>
    </Box>
  );
}

const AvailableBookCard = ({ book }: CardProps) => {
  const { name, media } = book;

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={3}
    >
      <Stat>
        <StatLabel>SE</StatLabel>
        <StatNumber>{name}</StatNumber>
        <StatHelpText>{shorten(media.subTitle, 100)}</StatHelpText>
        <StatHelpText color={"primary.100"}>Available</StatHelpText>
      </Stat>
    </Box>
  )
}

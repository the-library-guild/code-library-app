import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber
} from "@chakra-ui/react";

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
    <Flex
      w="100%"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={20} px={8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>All Books</Heading>
        </Stack>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Stack>
    </Flex>
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

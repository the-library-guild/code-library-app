import React from "react";

import {
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";

import { Book } from ".";
import Link from 'next/link';

interface CardProps {
  book: Book;
}

export function BookCard({ book }: CardProps) {
  const {
    rentable: { stateTags },
  } = book;

  const bookIsAvailable = stateTags.includes("Available");

  return bookIsAvailable ? (
    <AvailableBookCard book={book} />
  ) : (
    <NonAvailableBookCard book={book} />
  );
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
        <StatNumber><Link href={`/books/${book._id}`}>{name}</Link></StatNumber>
        <StatHelpText>{media?.tagline}</StatHelpText>
        <StatHelpText color={useColorModeValue("red.800", "red.300")}>
          Not Available
        </StatHelpText>
      </Stat>
    </Box>
  );
};

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
        <StatNumber><Link href={`/books/${book._id}`}>{name}</Link></StatNumber>
        <StatHelpText>{media?.tagline}</StatHelpText>
        <StatHelpText color={"primary.100"}>Available</StatHelpText>
      </Stat>
    </Box>
  );
};

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";

import { Book } from ".";
import { useBookState } from "../../hooks/use-book-state.hook";

const programAcronym = (contentTags: string[]) => contentTags[3];

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
}
export function BookCard({ book, isExpanded = false }: BookCardProps) {
  const { data: session } = useSession();

  const { label, color, hasAction, actionLabel, action } = useBookState(
    book,
    session
  );
  const { name, media } = book;

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={3}
    >
      <Stat>
        <StatLabel>
          {media?.contentTags ? programAcronym(media?.contentTags) : "Unknown"}
        </StatLabel>
        <StatNumber>
          <Link href={`/books/${book?._id}`}>{name}</Link>
        </StatNumber>
        <StatHelpText>{media?.tagline}</StatHelpText>
        <StatHelpText color={color}>{label}</StatHelpText>
      </Stat>
      {isExpanded && (
        <Flex>
          <Spacer />
          {hasAction && (
            <Button marginLeft={"auto"} onClick={() => action && action()}>
              {actionLabel}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
}
// const NonAvailableBookCard = ({ book }: BookCardProps) => {
//   return (
//     <Box
//       rounded={"lg"}
//       bg={useColorModeValue("white", "gray.700")}
//       boxShadow={"lg"}
//       p={3}
//     >
//       <Stat>
//         <StatLabel>PM</StatLabel>
//         <StatNumber>
//           <Link href={`/books/${book._id}`}>{name}</Link>
//         </StatNumber>
//         <StatHelpText>{media?.tagline}</StatHelpText>
//         <StatHelpText color={useColorModeValue("red.800", "red.300")}>
//           Not Available
//         </StatHelpText>
//       </Stat>
//     </Box>
//   );
// };

// const AvailableBookCard = ({ book }: BookCardProps) => {
//   const { name, media } = book;

//   return (
//     <Box
//       rounded={"lg"}
//       bg={useColorModeValue("white", "gray.700")}
//       boxShadow={"lg"}
//       p={3}
//     >
//       <Stat>
//         <StatLabel>SE</StatLabel>
//         <StatNumber>
//           <Link href={`/books/${book._id}`}>{name}</Link>
//         </StatNumber>
//         <StatHelpText>{media?.tagline}</StatHelpText>
//         <StatHelpText color={"primary.100"}>Available</StatHelpText>
//       </Stat>
//     </Box>
//   );
// };

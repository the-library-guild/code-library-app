import React from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { hasPerms, Perm } from "code-library-perms";

import {
  Box,
  Button,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { gql, useQuery } from "@apollo/client";

import { Content } from "../../layout/Content";
import { InternalPage } from "../../layout/InternalPage";
import { useRouter } from "next/router";
import { FullPageSpinner } from "../../components/FullPageSpinner";
import { ActionButton } from "../../components/Booklist/ActionButton";

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

const programAcronym = (contentTags: string[]) => contentTags[3];

function BookDetailedPage() {
  const { query } = useRouter();

  const { data: session, status } = useSession();

  const bookId = query.id as string;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  if (loading) return <FullPageSpinner />;

  const book = data?.getBook;

  if (error || !book) return <h1>Could not find requested book</h1>;

  const { name, media, rentable } = book;

  return (
    <InternalPage>
      <Content px={4}>
        <Stack w={"100%"} spacing={4} mt={4}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={3}
          >
            <Stat>
              <StatLabel>
                {media?.contentTags
                  ? programAcronym(media?.contentTags)
                  : "Unkown"}
              </StatLabel>
              <StatNumber>
                <Link href={`/books/${book._id}`}>{name}</Link>
              </StatNumber>
              <StatHelpText>{media?.tagline}</StatHelpText>
              <StatHelpText color={useColorModeValue("red.800", "red.300")}>
                Not Available
              </StatHelpText>
            </Stat>

            <Flex>
              <Spacer />
              {ActionButton(rentable.stateTags, session)}
            </Flex>
          </Box>
        </Stack>
      </Content>
    </InternalPage>
  );
}

BookDetailedPage.permissions = Perm.VIEW_BOOKS;

export default BookDetailedPage;

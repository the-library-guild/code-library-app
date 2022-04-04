import React from "react";

import { InternalPage } from "../layout/InternalPage";

import { Booklist } from "../components/Booklist/Booklist";

import { Perm } from "code-library-perms";
import { Content } from "../layout/Content";
import { Heading, Stack } from "@chakra-ui/react";
import { FullPageSpinner } from "../components/FullPageSpinner";
import { useSearch } from "../components/Search/use-search.hook";
import { SearchBox } from "../components/Search/SearchBox";

function IndexPage() {
  const { loading, error, books, searchTerm, setSearchTerm } = useSearch();

  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <InternalPage>
      <Content px={4}>
        <Stack spacing={6} py={8} px={2} wordBreak={"break-all"} width={"100%"}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>All Books</Heading>
          </Stack>
          {loading ? <FullPageSpinner /> : <Booklist books={books} />}
        </Stack>
      </Content>
    </InternalPage>
  );
}

IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;

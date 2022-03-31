import React from 'react';

import { InternalPage } from "../layout/InternalPage";

import { Booklist } from "../components/Booklist/Booklist";

import { Perm } from "code-library-perms";
import { useGetShelf } from "../components/Booklist/Booklist.hook";

function IndexPage() {
  const query = useGetShelf();
  return (
    <InternalPage>
      <Booklist query={query} />
    </InternalPage>
  );
}

IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;

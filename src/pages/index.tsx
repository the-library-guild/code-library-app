import { InternalPage } from "../layout/InternalPage";

import { Booklist } from "../components/Booklist/Booklist";
import { useGetShelf } from "../components/Booklist/Booklist.hook";
import { Perm } from "code-library-perms";

function BooksPage() {
  return (
    <InternalPage>
      <Booklist query={useGetShelf()} />
    </InternalPage>
  );
}

BooksPage.permissions = Perm.VIEW_BOOKS;

export default BooksPage;

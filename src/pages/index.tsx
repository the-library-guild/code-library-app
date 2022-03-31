import { InternalPage } from "../layout/InternalPage";

import { Booklist } from "../components/Booklist/BookList";
import { Perm } from "code-library-perms";

function BooksPage() {
  return (
    <InternalPage>
      <Booklist />
    </InternalPage>
  );
}

BooksPage.permissions = Perm.VIEW_BOOKS;

export default BooksPage;

import { gql, useQuery } from "@apollo/client";

import { InternalPage } from "../layout/InternalPage";
import { FullPageSpinner } from "../components/FullPageSpinner";

import { BookList } from "../components/BookList";
import { Perm } from "code-library-perms";
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

const GET_BOOKS = gql`
  query GetBooks {
    getShelf {
      children {
        _id
        name
        rentable {
          stateTags
        }
        media {
          contentTags
          tagline
          publishedDate
          contentDesc
        }
      }
    }
  }
`;

function BooksPage() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <FullPageSpinner />;

  if (error) return <div>{`Error! ${error.message}`}</div>;

  const booklist: Book[] = data.getAllBooks;

  return (
    <InternalPage>
      <BookList books={booklist} />
    </InternalPage>
  );
}

BooksPage.permissions = Perm.VIEW_BOOKS;

export default BooksPage;

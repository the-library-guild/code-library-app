import { gql, useQuery } from "@apollo/client";

import { InternalPage } from "../layout/InternalPage";
import { FullPageSpinner } from "../components/FullPageSpinner";

import { BookList } from "../components/BookList";
import { Perm } from "code-library-perms";

import ProtectComponent from "../hoc/ProtectComponent";
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
    getAllBooks {
      _id
      name
      rentable {
        ownershipStateTags
      }
      media {
        contentTags
        subTitle
        publishedDate
        contentDesc
      }
    }
  }
`;

export default function BooksPage() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <FullPageSpinner />;

  if (error) return <div>{`Error! ${error.message}`}</div>;

  const booklist: Book[] = data.getAllBooks;

  return (
    <ProtectComponent permsInt={Perm.VIEW_BOOKS}>
      <InternalPage>
        <BookList books={booklist} />
      </InternalPage>
    </ProtectComponent>
  );
}

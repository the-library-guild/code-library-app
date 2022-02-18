import { gql, useQuery } from "@apollo/client";
import { signOut } from "next-auth/react";

import { Perm } from "code-library-perms";

import ProtectComponent from "../hoc/ProtectComponent";
import style from "../styles/bookList.module.css";

interface Book {
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
const shorten = (str: string, maxLength: number) =>
  str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

function BookCard({ book }: { book: Book }) {
  const { name, media, rentable } = book;

  const isAvailable = rentable.ownershipStateTags.includes("Available");

  const className =
    style.book +
    " " +
    style["book--" + (isAvailable ? "available" : "unAvailable")];

  return (
    <li className={className}>
      <h3 className={style.book__title}>{shorten(name, 30)}</h3>
      <span className={style.book__subTitle}>
        {shorten(media.subTitle, 40)}
      </span>
    </li>
  );
}
function Page() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i
          className="fas fa-cog fa-spin"
          style={{ color: "white", fontSize: "5rem" }}
        />
      </div>
    );
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const booklist: Book[] = data.getAllBooks;

  return (
    <ProtectComponent permsInt={Perm.VIEW_BOOKS}>
      <button onClick={() => signOut()}>Sign Out</button>

      <div className={style.bookList}>
        <div className={style.bookList__header}>
          <h2>Anbei die Bibliothek</h2>
        </div>
        <ul>
          {booklist.map((book, idx) => (
            <BookCard book={book} key={idx} />
          ))}
        </ul>
      </div>
    </ProtectComponent>
  );
}
export default Page;

// we can take advantage of ssr if needed:

// export async function getServerSideProps(ctx: any) {
//   const res = await client.query({ query: GET_BOOKS });
//   return {
//     props: { books: res.data.getAllBooks },
//   };
// }

import { gql, useQuery } from "@apollo/client";
import { signOut } from "next-auth/react";

import { Perm } from "code-library-perms";

import ProtectComponent from "../hoc/ProtectComponent";

import { BookCard } from "../components/BookCard";

import { Button, Flex } from '@chakra-ui/react';

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
    }
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

export default function BooksPage() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
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
  }

	console.log(error);

  if (error) return <div>{`Error! ${error.message}`}</div>;

  const booklist: Book[] = data.getAllBooks;

	console.log(booklist);

  return (
    <ProtectComponent permsInt={Perm.VIEW_BOOKS}>
        <Flex w="1000px" h="1000px" bg="black">
					<Flex maxW={1480} m="0 auto">
						<Button 
							onClick={() => signOut()}
							colorScheme="orange"
						>
							Sign Out
					</Button>
					<BookList books={booklist}/>
				</Flex>
			</Flex>
    </ProtectComponent>
  );
}

type BookListProps = {
	books: Book[];
}

function BookList({ books }: BookListProps) {
	return (
		<div className={style.bookList}>
			<div className={style.bookList__header}>
					<h2>Anbei die Bibliothek</h2>
			</div>
			<ul>
					{books.map((book, idx) => (
					<BookCard book={book} key={idx} />
					))}
			</ul>
	</div>
	);
}

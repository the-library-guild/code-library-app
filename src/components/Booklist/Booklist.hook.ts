import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

interface Book {
  _id: string;
  name: string;
  rentable: {
    stateTags: string[];
  };
  media: {
    contentTags: string[];
    tagline: string;
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

interface getBooksResponse {
  getShelf: {
    children: Book[];
  };
}

const shorten = (str: string, maxLength: number): string => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export function useGetShelf() {
  const { loading, error, data } = useQuery<getBooksResponse>(GET_BOOKS);

  const childrenList = data?.getShelf?.children ?? [];

  const books: Book[] = childrenList.map((book) => {
    return {
      ...book,
      media: {
        ...book.media,
        tagline: shorten(book.media.tagline, 100),
      },
    };
  });

  return { loading, error, books };
}

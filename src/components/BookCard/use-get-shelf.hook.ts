import { useQuery } from "@apollo/client";

import { Book } from ".";

interface getBooksResponse {
  getShelf: {
    children: Book[];
  };
}

const shorten = (str: string, maxLength: number): string => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export function useBookContainer(query: any) {
  const { loading, error, data, refetch } = useQuery<getBooksResponse>(query);

  const childrenList = (data?.getShelf?.children ?? []) as Book[];

  console.log(childrenList[0]);

  const books = childrenList.map((book) => ({
    ...book,
    media: {
      ...book.media,
      tagline: shorten(book.media.tagline, 100),
    },
  }));
  return { loading, error, books, refetch };
}

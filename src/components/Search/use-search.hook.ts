import { ApolloError } from "@apollo/client";

import { useEffect, useState } from "react";
import { useGetShelf } from "../Booklist/Booklist.hook";
import { Book } from "../Booklist";

interface UseSearchValue {
  loading: boolean;
  error: ApolloError | undefined;
  books: Book[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const bySearchTerm = (searchTerm: string) => (book: Book) => {
  const relevantFields = [...book.media.contentTags, book.name];

  return relevantFields.some((tag: string) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export function useSearch(): UseSearchValue {
  const { loading, error, books } = useGetShelf();

  const [results, setResults] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (loading) return;

    let childrenList = books ?? [];

    if (searchTerm) {
      childrenList = childrenList.filter(bySearchTerm(searchTerm));
    }

    setResults(childrenList);
  }, [searchTerm, loading]);

  return { loading, error, books: results, searchTerm, setSearchTerm };
}

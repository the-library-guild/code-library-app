import { ApolloError, gql, useQuery } from "@apollo/client";
import { filter } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

interface UseSearchValue {
  loading: boolean;
  error: ApolloError | undefined;
  books: Book[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const filteredResults = (results: Book[], searchTerm: string) => {
  return results.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.media.contentTags.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
};

export function useSearch(): UseSearchValue {
  const { loading, error, data } = useQuery<getBooksResponse>(GET_BOOKS);

  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    let childrenList = data?.getShelf?.children ?? [];

    if (debouncedSearchTerm) {
      childrenList = filteredResults(childrenList, debouncedSearchTerm);
    }

    const finalList: Book[] = childrenList.map((book) => {
      console.log(book);
      return {
        ...book,
        media: {
          ...book.media,
          tagline: shorten(book.media.tagline, 100),
        },
      };
    });

    setBooks(finalList);
  }, [debouncedSearchTerm]);

  return { loading, error, books, searchTerm, setSearchTerm };
}

function useDebounce(value: string, delayInSeconds: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayInSeconds);

    return () => clearTimeout(handler);
  }, [value, delayInSeconds]);

  return debouncedValue;
}

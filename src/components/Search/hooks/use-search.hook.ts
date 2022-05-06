import { useEffect, useState } from 'react';

import { Book } from '../../BookCard/BookCard.constants';

interface UseSearchValue {
  results: Book[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setInitialResults: (initialResults: Book[]) => void;
}

const bySearchTerm = (searchTerm: string) => (book: Book) => {
  const relevantFields = [...book.media.contentTags, book.name];

  return relevantFields.some((tag: string) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export function useSearch(): UseSearchValue {
  const [results, setResults] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialResults, setInitialResults] = useState<Book[]>();

  useEffect(() => {
    let newResults = initialResults ?? [];

    if (searchTerm) {
      newResults = newResults.filter(bySearchTerm(searchTerm));
    }

    setResults(newResults);
  }, [searchTerm, initialResults]);

  return {
    results,
    searchTerm,
    setSearchTerm,
    setInitialResults,
  };
}

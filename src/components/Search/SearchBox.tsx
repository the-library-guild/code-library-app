import React from 'react';

import { Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBox({ searchTerm, setSearchTerm }: SearchBoxProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <Input type={'string'} placeholder={'Search for books'} size={'md'} value={searchTerm} onChange={handleChange} />
  );
}

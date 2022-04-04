import React, { ChangeEvent } from "react";
import { FormControl, Select, Input } from "@chakra-ui/react";

interface ContainerOption {
  label: string;
  query: any;
}
interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  containerOptions: { [value: string]: ContainerOption };
  setQuery: any;
}

export function SearchBox({
  searchTerm,
  setSearchTerm,
  containerOptions,
  setQuery,
}: SearchBoxProps) {
  return (
    <FormControl display="flex" alignItems="center" flexDirection="column">
      <Select
        height="5rem"
        fontSize="var(--chakra-fontSizes-4xl)"
        fontFamily="var(--chakra-fonts-heading)"
        fontWeight="var(--chakra-fontWeights-bold)"
        onChange={(e) => setQuery(containerOptions[e.target.value].query)}
      >
        {Object.entries(containerOptions).map(([value, option]) => (
          <option key={value} value={value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Input
        width="66%"
        marginRight="auto"
        type="string"
        placeholder="🔍 Search by title, author, or topic"
        size="md"
        value={searchTerm}
        marginTop="3rem"
        marginBottom="1.5rem"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </FormControl>
  );
}

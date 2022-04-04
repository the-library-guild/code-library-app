import { ApolloError } from "@apollo/client";

import { BookCard } from "./BookCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BooklistQuery {
  query: {
    loading: boolean;
    error: ApolloError | undefined;
    books: Book[];
  };
}

export interface Book {
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
export { BookCard };

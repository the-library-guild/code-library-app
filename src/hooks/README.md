# Hooks

## What's it for?

[React Hooks](https://reactjs.org/docs/hooks-custom.html#gatsby-focus-wrapper) are an amazing tool for abstracting business logic away from the application look & feel.
In its essence, hooks are simply functions that "hook into" the React lifecycle.
Our primary concern when creating custom hooks is to encapsulate complex logic into reusable components that can be used in different parts of our app.

## How can I work with it?

We believe in examples as a good way to explain our guidelines. You can find the full implementation of the following snippet at `src/hooks/use-shelf.hook.ts`.

```tsx
import { useQuery } from '@apollo/client';

import { Book, fromResponse } from '../services/code-library-server/books';
import { GET_SHELF } from '../services/code-library-server/queries';

interface getShelfResponse {
  getShelf: {
    children: Book[];
  };
}

export function useShelf(options: any = {}) {
  const { loading, error, data, refetch } = useQuery<getShelfResponse>(
    GET_SHELF,
    {
      ...options,
      returnPartialData: true,
      notifyOnNetworkStatusChange: true,
    }
  );

  const response = (data?.getShelf?.children ?? []) as Book[];

  const books = fromResponse(response);

  return { loading, error, books, refetch };
}
```

This custom hook is responsible for reaching out to our backend API to get all books available in the shelf and return them into an appropiate formatting.

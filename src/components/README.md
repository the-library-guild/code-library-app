# Components

This folder can be found in pretty much every React project out there. We shove here all components used to build our UI. There are no strict rules to how to structure things here but keep in mind the following.

- Keep things that change for the same reason together.
- Keep internal-only components nested into their parent components folder.
- Always strive for local state, with custom hooks as you second option. If none solves your needs, go for the React Context API, and only there consider using an exaternal state management library.

You can find the following snippet at `src/components/BooksContainer.tsx`

```tsx
import React from 'react';

import { Book } from './BookCard/BookCard.constants';
import { FullPageSpinner } from './FullPageSpinner';
import { BookCard } from './BookCard/BookCard';

interface BooksProps {
  loading: boolean;
  error: any;
  books: Book[];
}

export const BooksContainer = React.memo(function BooksContainer({
  loading,
  error,
  books,
}: BooksProps) {
  if (loading) return <FullPageSpinner />;
  if (error) return <Error error={error} />;
  if (books?.length === 0) return <EmptyShelf />;

  return (
    <>
      {books.map((book) => (
        <BookCard key={book?._id} book={book} />
      ))}
    </>
  );
});

function Error({ error }: { error: Error }) {
  return <div>{`Error! ${error.message}`}</div>;
}

function EmptyShelf() {
  return <div>We could not find any books :(</div>;
}
```

This components is responsible for rendering a list of books provided by an asynchronous fetcher, similar to [React Suspense](https://17.reactjs.org/docs/concurrent-mode-suspense.html).

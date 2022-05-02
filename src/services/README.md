# Services

## What's it for?

The `services` folder is where we keep code related to the communication with external APIs.
Each integration is a new folder with its own collection of specialized modules.

For example, `code-library-server` is where we implement the modules responsible for consuming our backend API.
To avoid major refactoring as the system evolves, we always define our own adapters to integrate with external APIs.
Those adapters are responsible for mapping the responses from other services to objects and types our application relies on.

## How can I work with it?

We believe in examples as a good way to explain our guidelines. You can find the full implementation of the following snippet at `src/services/code-library-server/books.ts`.

```tsx
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

const shorten = (str: string, maxLength: number): string => {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

export function fromResponse(response: Book[]) {
  const books = response.map((book) => ({
    ...book,
    media: {
      ...book.media,
      tagline: shorten(book.media.tagline, 100),
    },
  }));

  return books;
}
```

Here we define our own types based on the information we get from the server, as well as formatting the response accordingly. Our components then rely on those types, instead of reaching out to the API's internals.

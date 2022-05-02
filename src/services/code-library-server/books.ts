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

export interface BookResource {
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

export type BookLifecycleStatus = 'Borrowed' | 'Available' | 'Processing';

export type Book = {
  id: string;
  title: string;
  subTitle?: string;
  designation?: string;
  status: BookLifecycleStatus;
  subjectArea?: string;
  quantity: number;
  isbn: string;
};

const contentTagsIndexOf = {
  rowInSpreadsheet: 0,
  bookId: 1,
  isbn: 2,
  designation: 3,
  quantity: 4,
};

const shorten = (str: string, maxLength: number): string => {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

const tags = (book: BookResource) => book?.media?.contentTags;

const designation = (book: BookResource) =>
  tags(book) ? tags(book)[3] : 'Unknown';

const status = (book: BookResource): BookLifecycleStatus => {
  const stateTags = book?.rentable?.stateTags ?? [];

  if (stateTags.includes('Borrowed')) return 'Borrowed';
  if (stateTags.includes('Available')) return 'Available';
  if (stateTags.includes('Processing')) return 'Processing';

  return 'Processing';
};

const quantity = (book: BookResource) => {
  if (tags(book)) {
    return Number(tags(book)[contentTagsIndexOf.quantity]);
  }

  return 0;
};

const subjectArea = (book: BookResource) => {
  return book?.media?.contentDesc || '';
};

const rowNumberInSpreadsheet = (book: BookResource) => {
  if (tags(book)) return tags(book)[contentTagsIndexOf.rowInSpreadsheet];

  return null;
};

const isbn = (book: BookResource) => {
  if (tags(book)) return tags(book)[contentTagsIndexOf.isbn];

  return '';
};

export const toSchema = (book: BookResource) => {
  return {
    id: book?._id,
    title: book?.name,
    subTitle: shorten(book?.media?.tagline, 100), // potentially to be called description
    designation: designation(book),
    status: status(book),
    subjectArea: subjectArea(book),
    quantity: quantity(book),
    rowNumberInSpreadsheet: rowNumberInSpreadsheet(book),
    isbn: isbn(book),
  };
};

export function fromResponse(response: BookResource[]) {
  return response.map(toSchema);
}

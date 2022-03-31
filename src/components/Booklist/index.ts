export interface BooklistQuery {
  query: {
    loading: boolean;
    error: any;
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

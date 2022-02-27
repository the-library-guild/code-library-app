import style from "../styles/bookList.module.css";

interface Book {
    name: string;
    rentable: {
      ownershipStateTags: string[];
    };
    media: {
      contentTags: string[];
      subTitle: string;
      publishedDate: Date;
      contentDesc: string;
    }
}

const shorten = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export function BookCard({ book }: { book: Book }) {
  const { name, media, rentable } = book;

  const isAvailable = rentable.ownershipStateTags.includes("Available");

  const className =
    style.book +
    " " +
    style["book--" + (isAvailable ? "available" : "unAvailable")];

  return (
    <li className={className}>
      <h3 className={style.book__title}>{shorten(name, 30)}</h3>
      <span className={style.book__subTitle}>
        {shorten(media.subTitle, 40)}
      </span>
    </li>
  );
}
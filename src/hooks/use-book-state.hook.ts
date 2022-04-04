import { gql, useMutation } from "@apollo/client";
import { useColorModeValue } from "@chakra-ui/react";

import { hasPerms, Perm } from "code-library-perms";

import { Book } from "../components/Booklist";

const RETURN_BOOK = gql`
  mutation ReturnBook($bookId: ID!) {
    returnBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
const RENT_BOOK = gql`
  mutation RentBook($bookId: ID!) {
    rentBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
const PROCESS_BOOK = gql`
  mutation ProcessBook($bookId: ID!) {
    processBook(bookId: $bookId) {
      ... on Success {
        id
      }
    }
  }
`;
/* move this out */

interface Info {
  isBorrowed: boolean;
  isAvailable: boolean;
  isProcessing: boolean;
  canRent: boolean;
  canProcess: boolean;
  canReturn: boolean;
}
interface useBookStateValue {
  label: string;
  color: string;
  hasAction: boolean;
  actionLabel: string;
  action: any;
}

function reduceLabel(i: Info) {
  if (i.isBorrowed) return "Borrowed";
  if (i.isAvailable) return "Available";
  if (i.isProcessing) return "Processing";

  return "Unknown";
}
function reduceColors(i: Info) {
  if (i.isAvailable) return ["green.800", "green.300"];

  return ["red.800", "red.300"];
}
function reduceActionQuery(i: Info): [string, any] {
  if (i.isProcessing && i.canProcess) return ["Process", PROCESS_BOOK];
  if (i.isAvailable && i.canRent) return ["Borrow", RENT_BOOK];
  if (i.isBorrowed && i.canReturn) return ["Return", RETURN_BOOK];

  return [
    "",
    gql`
      mutation Placeholder {
        processBook(bookId: "lal") {
          ... on Success {
            id
          }
        }
      }
    `,
  ];
}

function useBookState(book: Book, session: any): useBookStateValue {
  // TODO: dont display "Borrow" button if user has exceeded their booking limit
  // TODO: implement logic for canReturn

  const stateTags = book?.rentable?.stateTags ?? [];
  const userInfo = session?.user;
  const userPermissions = userInfo?.permsInt || 0;

  const isBorrowed = stateTags.includes("Borrowed");
  const isAvailable = stateTags.includes("Available");
  const isProcessing = stateTags.includes("Processing");

  const canProcess = hasPerms(userPermissions, Perm.MANAGE_BOOKS);
  const canReturn = true;
  const canRent = hasPerms(userPermissions, Perm.RENT_BOOKS);

  const info: Info = {
    isBorrowed,
    isAvailable,
    isProcessing,
    canRent,
    canProcess,
    canReturn,
  };
  const label = reduceLabel(info);

  const [lightColor, darkColor] = reduceColors(info);
  const color = useColorModeValue(lightColor, darkColor);

  const [actionLabel, actionQuery] = reduceActionQuery(info);

  const hasAction = actionLabel !== "";

  const [rawAction, { loading, error }] = useMutation(actionQuery, {
    variables: { bookId: book?._id },
  });

  const action = hasAction && !loading && !error && rawAction;

  return { label, color, hasAction, actionLabel, action };
}
export { useBookState };

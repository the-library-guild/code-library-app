import { gql, useMutation } from "@apollo/client";
import { useColorModeValue } from "@chakra-ui/react";

import { Perm } from "code-library-perms";

import { Book } from ".";
import { PROCESS_BOOK, RENT_BOOK, RETURN_BOOK } from "../../queries/mutations";

import type { UserInfoValue } from "../../hooks/use-user-info.hook";

// TODO: force book to update on mutation

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
  if (i.isProcessing && i.canProcess) return ["Return to Shelf", PROCESS_BOOK];
  if (i.isAvailable && i.canRent) return ["Borrow", RENT_BOOK];
  if (i.isBorrowed && i.canReturn) return ["Return", RETURN_BOOK];

  return [
    "",
    // TODO: find a more elegant solution for mutation Placeholder
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

function useBookState(book: Book, userInfo: UserInfoValue): useBookStateValue {
  // TODO: canBorrow = false if user has exceeded their booking limit
  // TODO: implement env.ANYONE_CAN_RETURN (also in backend), which will influence canReturn

  const stateTags = book?.rentable?.stateTags ?? [];

  const isBorrowed = stateTags.includes("Borrowed");
  const isAvailable = stateTags.includes("Available");
  const isProcessing = stateTags.includes("Processing");

  const canProcess = userInfo.hasPerms(Perm.MANAGE_BOOKS);
  const canReturn = true;
  const canRent = userInfo.hasPerms(Perm.RENT_BOOKS);

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

import { gql, useMutation } from '@apollo/client';
import { useColorModeValue } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Book } from '@/services/code-library-server/books';
import {
  PROCESS_BOOK,
  RENT_BOOK,
  RETURN_BOOK,
} from '../../../services/code-library-server/mutations';

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
  if (i.isBorrowed) return 'Borrowed';
  if (i.isAvailable) return 'Available';
  if (i.isProcessing) return 'Processing';

  return 'Unknown';
}
function reduceColors(i: Info) {
  if (i.isAvailable) return ['green.400', 'green.300'];

  return ['red.600', 'red.300'];
}
function reduceActionQuery(i: Info): [string, any] {
  if (i.isProcessing && i.canProcess) return ['Return to Shelf', PROCESS_BOOK];
  if (i.isAvailable && i.canRent) return ['Borrow', RENT_BOOK];
  if (i.isBorrowed && i.canReturn) return ['Return', RETURN_BOOK];

  return [
    '',
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

interface UserInfoValue {
  hasPerms: (perm: number | number[]) => boolean;
}

function useBookState(book: Book, userInfo: UserInfoValue): useBookStateValue {
  // TODO: canBorrow = false if user has exceeded their booking limit
  // Shall we add number of rentable books to the JWT token?
  // TODO: implement env.ANYONE_CAN_RETURN (also in backend), which will influence canReturn

  const text = (text: string) => ({
    includes: (match: string) => text === match,
  });

  const isBorrowed = text(book.status).includes('Borrowed');
  const isAvailable = text(book.status).includes('Available');
  const isProcessing = text(book.status).includes('Processing');

  const canProcess = userInfo.hasPerms(Perm.MANAGE_BOOKS);
  const canReturn = userInfo.hasPerms(Perm.RENT_BOOKS);
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

  const hasAction = actionLabel !== '';

  const [rawAction, { loading, error }] = useMutation(actionQuery, {
    variables: { bookId: book?.id },
    refetchQueries: 'all',
  });

  const action = hasAction && !loading && !error && rawAction;

  return { label, color, hasAction, actionLabel, action };
}
export { useBookState };

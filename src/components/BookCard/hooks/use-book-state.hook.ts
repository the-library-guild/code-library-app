import { useColorModeValue } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Book } from '@/services/code-library-server/books';

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
  if (i.isProcessing) return ['yellow.600', 'yellow.300'];

  return ['red.600', 'red.300'];
}
function reduceActionQuery(i: Info): string {
  if (i.isProcessing && i.canProcess) return 'Return to Shelf';
  if (i.isAvailable && i.canRent) return 'Borrow';
  if (i.isBorrowed && i.canReturn) return 'Return';

  return '';
}

interface UserInfoValue {
  hasPerms: (perm: number | number[]) => boolean;
}

declare global {
  interface Window {
    userInfoFromToken: any;
    computedUserInfo: any;
  }
}

function useBookState(book: Book, userInfo: UserInfoValue): useBookStateValue {
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

  window.userInfoFromToken = userInfo || {};
  window.computedUserInfo = info || {};

  const label = reduceLabel(info);

  const [lightColor, darkColor] = reduceColors(info);
  const color = useColorModeValue(lightColor, darkColor);

  const action = reduceActionQuery(info);

  const hasAction = action !== '';

  return { label, color, hasAction, action };
}
export { useBookState };

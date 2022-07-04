import { useMutation } from '@apollo/client';

import { CheckCircleIcon, InfoIcon, NotAllowedIcon } from '@chakra-ui/icons';

import {
  Stack,
  Button,
  Text,
  ModalCloseButton,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';

import {
  checkMutationContainErrors,
  RENT_BOOK,
} from '@/services/code-library-server';

import {
  ActionStatusDialog,
  useActionStatusContext,
} from './ActionStatusDialog';

import { dueDateFromNow } from './BookCard.helpers';
import { useAccount } from '../AccountManagementContext';

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

function Overbooked() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<InfoIcon />}>Overbooked</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton size={'md'} />
        <PopoverBody p={8} textAlign={'center'}>
          <NotAllowedIcon
            w={12}
            h={12}
            alignSelf={'center'}
            color={'red.300'}
          />
          <Text mt={4} fontWeight={'semibold'}>
            You have reached the limit of books one can borrow.
          </Text>
          <Text>Please return one of your books before getting a new one.</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export const BorrowingInstructions = () => {
  const { onCompleted } = useActionStatusContext();

  const [, dueDate] = dueDateFromNow();

  return (
    <>
      <ModalCloseButton onClick={onCompleted} />
      <ActionStatusDialog.Body>
        <Stack spacing={2} align={'center'} mt={8} p={8}>
          <CheckCircleIcon w={12} h={12} color={'green.300'} />
          <Text fontWeight={'semibold'}>Book successfully borrowed 🎉</Text>
          <Stack spacing={0}>
            <Text>We hope you enjoy your reading.</Text>
            <Text>Please make sure to return it until</Text>
            <Text fontWeight={'bold'}>{new Date(dueDate).toDateString()}</Text>
          </Stack>
        </Stack>
      </ActionStatusDialog.Body>
      <ActionStatusDialog.Footer>
        <Stack w={'100%'} direction={'row'} justify={'space-evenly'}>
          <Button w={'100%'} onClick={onCompleted} p={6}>
            Okay
          </Button>
        </Stack>
      </ActionStatusDialog.Footer>
    </>
  );
};

type BorrowBookButtonProps = {
  bookId: string;
  onError: (error: { title: string; description: string }) => any;
  onCompleted: () => any;
};

export function BorrowBookButton({
  bookId,
  onError,
  onCompleted,
}: BorrowBookButtonProps) {
  const [dispatch, { loading, error }] = useMutation(RENT_BOOK, {
    variables: { bookId },
    update(cache, { data: { rentBook } }) {
      if (rentBook.__typename != 'Success') return;

      cache.modify({
        id: `Item:${rentBook.id}`,
        fields: {
          rentable() {
            const [rentedDate, dueDate] = dueDateFromNow();
            return {
              dueDate,
              rentedDate,
              stateTags: ['Borrowed'],
            };
          },
        },
      });
    },
    onCompleted: ({ rentBook }) => {
      const error = checkMutationContainErrors(rentBook);
      if (error) {
        onError(error);
      } else {
        onCompleted();
      }
    },
  });

  const { numberOfBooksBorrowed } = useAccount();

  const hasReachedLimit = numberOfBooksBorrowed >= 2;

  const onClick = () => {
    dispatch();
  };

  if (error) {
    onError({
      title: 'Server Error',
      description: error.message,
    });
  }

  return (
    <>
      {hasReachedLimit && <Overbooked />}
      {!hasReachedLimit && (
        <Button
          variant={'outline'}
          onClick={onClick}
          isLoading={loading}
          isDisabled={hasReachedLimit}
        >
          Borrow
        </Button>
      )}
    </>
  );
}

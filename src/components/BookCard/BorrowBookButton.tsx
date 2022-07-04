import { useMutation } from '@apollo/client';

import { CheckCircleIcon } from '@chakra-ui/icons';

import {
  Stack,
  Divider,
  Button,
  Text,
  ModalCloseButton,
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

  const onClick = () => {
    dispatch();
  };

  if (error) {
    onError({
      title: 'Server Error',
      description: error.message,
    });
  }

  const hasReachedLimit = false;

  return (
    <>
      <Button
        variant={'outline'}
        onClick={onClick}
        isLoading={loading}
        isDisabled={hasReachedLimit}
      >
        Borrow
      </Button>
    </>
  );
}

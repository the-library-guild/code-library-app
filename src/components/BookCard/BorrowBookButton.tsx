import { useEffect } from 'react';

import { ApolloError, useMutation } from '@apollo/client';

import { CheckCircleIcon } from '@chakra-ui/icons';

import { Stack, Divider, Button, Text } from '@chakra-ui/react';

import { RENT_BOOK } from '@/services/code-library-server';

import {
  ActionStatusDialog,
  useActionStatusDialogContext,
} from './ActionStatusDialog';
import { useBookLifeCycle } from './BookLifeCycleContext';

type BorrowBookDialogProps = {
  loading: boolean;
  error: ApolloError | undefined;
  onReturn: () => any;
};

const Success = ({ onReturn }) => {
  const { onClose } = useActionStatusDialogContext();

  const onClick = () => {
    onReturn();
    onClose();
  };

  return (
    <>
      <ActionStatusDialog.Header>
        Title borrowed successfully
      </ActionStatusDialog.Header>
      <ActionStatusDialog.Body>
        <Stack spacing={2} align={'center'}>
          <CheckCircleIcon w={12} h={12} color={'green.300'} />
          <Text fontWeight={'semibold'}>We hope you enjoy your reading 🎉</Text>
          <Stack spacing={0}>
            <Text>Please make sure to return it until</Text>
            <Text fontWeight={'bold'}>March 24th 2022</Text>
          </Stack>
        </Stack>
      </ActionStatusDialog.Body>
      <ActionStatusDialog.Footer>
        <Stack w={'100%'}>
          <Stack direction={'row'} justify={'space-evenly'} align={'center'}>
            <Divider />
            <Text fontSize={'smaller'}>or</Text>
            <Divider />
          </Stack>
          <Button w={'100%'} onClick={onClick}>
            Return this book now
          </Button>
        </Stack>
      </ActionStatusDialog.Footer>
    </>
  );
};

export function BorrowBookDialog({
  loading,
  error,
  onReturn,
}: BorrowBookDialogProps) {
  return (
    <ActionStatusDialog
      loading={loading}
      error={error}
      onSuccess={<Success onReturn={onReturn} />}
    />
  );
}

export function BorrowBookButton({ bookId }: { bookId: string }) {
  const [dispatch, { loading, error }] = useMutation(RENT_BOOK, {
    variables: { bookId },
    refetchQueries: 'all',
  });

  const {
    hasReachedLimit,
    handlers: { borrowBook, returnBook },
  } = useBookLifeCycle();

  const onClick = async () => {
    await dispatch();
    borrowBook();
  };

  return (
    <>
      <BorrowBookDialog
        loading={loading}
        error={error}
        onReturn={() => returnBook()}
      />
      <Button
        variant={'outline'}
        onClick={onClick}
        isDisabled={loading || hasReachedLimit}
      >
        Borrow
      </Button>
    </>
  );
}

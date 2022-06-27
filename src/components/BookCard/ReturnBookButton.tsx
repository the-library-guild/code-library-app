import { useEffect } from 'react';

import { ApolloError, useMutation } from '@apollo/client';

import { InfoIcon } from '@chakra-ui/icons';
import { Stack, Button, Text } from '@chakra-ui/react';

import { RETURN_BOOK } from '@/services/code-library-server';

import {
  ActionStatusDialog,
  useActionStatusDialogContext,
} from './ActionStatusDialog';

import { useBookLifeCycle } from './BookLifeCycleContext';
import { PrimaryButton } from '../PrimaryButton';

const Success = () => {
  const { onClose } = useActionStatusDialogContext();

  return (
    <>
      <ActionStatusDialog.Header>
        Request successfully handled
      </ActionStatusDialog.Header>
      <ActionStatusDialog.Body>
        <Stack spacing={2} align={'center'}>
          <InfoIcon w={12} h={12} />
          <Text fontWeight={'semibold'}>
            {`Now please put the book back into the "Return Box",
            next to the library shelves on campus. 📚`}
          </Text>
        </Stack>
      </ActionStatusDialog.Body>
      <ActionStatusDialog.Footer>
        <Stack w={'100%'} direction={'row'} justify={'space-evenly'}>
          <PrimaryButton onClick={onClose} w={'100%'}>
            Done
          </PrimaryButton>
        </Stack>
      </ActionStatusDialog.Footer>
    </>
  );
};

type ReturnBookDialogProps = {
  loading: boolean;
  error: ApolloError | undefined;
};

export function ReturnBookDialog({ loading, error }: ReturnBookDialogProps) {
  return (
    <ActionStatusDialog
      loading={loading}
      error={error}
      onSuccess={<Success />}
    />
  );
}

export function ReturnBookButton({ bookId }: { bookId: string }) {
  const [dispatch, { loading, error }] = useMutation(RETURN_BOOK, {
    variables: { bookId },
    refetchQueries: 'all',
  });

  const {
    handlers: { returnBook },
  } = useBookLifeCycle();

  const onClick = async () => {
    await dispatch();
    returnBook();
  };

  useEffect(() => {
    if (error) alert('Oh no... something went wrong');
  }, [error]);

  return (
    <>
      <ReturnBookDialog loading={loading} error={error} />
      <Button variant={'outline'} onClick={onClick} isDisabled={loading}>
        Return
      </Button>
    </>
  );
}

export default ReturnBookButton;

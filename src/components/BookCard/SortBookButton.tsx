import { useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { Button } from '@chakra-ui/react';

import { PROCESS_BOOK } from '@/services/code-library-server';
import { useToasts } from '@/hooks/use-toasts';
import { useBookLifeCycle } from './BookLifeCycleContext';

export function SortBookButton({ bookId }: { bookId: string }) {
  const [dispatch, { loading, data, error, reset }] = useMutation(
    PROCESS_BOOK,
    {
      variables: { bookId },
      refetchQueries: 'all',
    }
  );

  const { showError, showSuccess } = useToasts();

  const {
    handlers: { returnBook },
  } = useBookLifeCycle();

  const onClick = async () => {
    await dispatch();
    returnBook();
  };

  useEffect(() => {
    if (error) {
      showError({
        title: `Error: ${error.name}`,
        description: error.message,
      });
      reset();
    }
  }, [error, showError, reset]);

  useEffect(() => {
    if (data?.processBook.__typename === 'Success') {
      showSuccess({
        id: 'processing-success',
        title: 'Success',
        description: 'Book added back to the shelf.',
      });
      reset();
    }
  }, [data, showSuccess, reset]);

  return (
    <Button
      variant={'outline'}
      onClick={onClick}
      isLoading={loading}
      loadingText={'Processing...'}
    >
      Sort back to shelf
    </Button>
  );
}

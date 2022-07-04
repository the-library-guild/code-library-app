import { useMutation } from '@apollo/client';

import { CheckCircleIcon } from '@chakra-ui/icons';
import { Stack, Button, Text, ModalCloseButton } from '@chakra-ui/react';

import {
  checkMutationContainErrors,
  RETURN_BOOK,
} from '@/services/code-library-server';

import {
  ActionStatusDialog,
  useActionStatusContext,
} from './ActionStatusDialog';

export const ReturnInstructions = () => {
  const { onCompleted } = useActionStatusContext();

  return (
    <>
      <ModalCloseButton onClick={onCompleted} />
      <ActionStatusDialog.Body>
        <Stack spacing={2} align={'center'} mt={8} p={8}>
          <CheckCircleIcon w={12} h={12} color={'green.300'} />
          <Text fontWeight={'semibold'}>Book successfully returned</Text>
          <Text>
            {`Now please put the book back into the "Return Box",
            next to the library shelves on campus. 📚`}
          </Text>
        </Stack>
      </ActionStatusDialog.Body>
      <ActionStatusDialog.Footer>
        <Stack w={'100%'} direction={'row'} justify={'space-evenly'}>
          <Button onClick={onCompleted} w={'100%'} p={6}>
            Done
          </Button>
        </Stack>
      </ActionStatusDialog.Footer>
    </>
  );
};

type ReturnBookButtonProps = {
  bookId: string;
  onError: (error: { title: string; description: string }) => any;
  onCompleted: () => any;
};

export function ReturnBookButton({
  bookId,
  onError,
  onCompleted,
}: ReturnBookButtonProps) {
  const [dispatch, { loading, error }] = useMutation(RETURN_BOOK, {
    variables: { bookId },
    update(cache, { data: { returnBook } }) {
      if (returnBook.__typename != 'Success') return;

      cache.modify({
        id: `Item:${returnBook.id}`,
        fields: {
          rentable(currentValue = {}) {
            return {
              ...currentValue,
              stateTags: ['Processing'],
            };
          },
        },
      });
    },
    onCompleted: ({ returnBook }) => {
      const error = checkMutationContainErrors(returnBook);
      if (error) {
        onError(error);
      } else {
        onCompleted();
      }
    },
  });

  if (error) {
    onError({
      title: 'Internal Server Error',
      description: error.message,
    });
  }

  const onClick = () => {
    dispatch();
  };

  return (
    <>
      <Button variant={'outline'} onClick={onClick} isLoading={loading}>
        Return
      </Button>
    </>
  );
}

export default ReturnBookButton;

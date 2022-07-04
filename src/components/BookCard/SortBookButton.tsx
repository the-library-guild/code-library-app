import { useMutation } from '@apollo/client';

import { Button, ModalCloseButton, Stack, Text } from '@chakra-ui/react';

import {
  checkMutationContainErrors,
  PROCESS_BOOK,
} from '@/services/code-library-server';

import ActionStatusDialog, {
  useActionStatusContext,
} from './ActionStatusDialog';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const BookSortedConfirmation = () => {
  const { onCompleted } = useActionStatusContext();

  return (
    <>
      <ModalCloseButton onClick={onCompleted} />
      <ActionStatusDialog.Body>
        <Stack spacing={2} align={'center'} mt={8} p={8}>
          <CheckCircleIcon w={12} h={12} color={'green.300'} />
          <Text fontWeight={'semibold'}>
            {`Book successfully added back to the shelf `}
          </Text>
          ✨
        </Stack>
      </ActionStatusDialog.Body>
      <ActionStatusDialog.Footer>
        <Stack w={'100%'} direction={'row'} justify={'space-evenly'}>
          <Button onClick={onCompleted} w={'100%'} p={6}>
            Dismiss
          </Button>
        </Stack>
      </ActionStatusDialog.Footer>
    </>
  );
};

type SortBookButtonProps = {
  bookId: string;
  onError: (error: { title: string; description: string }) => any;
  onCompleted: () => any;
};

export function SortBookButton({
  bookId,
  onError,
  onCompleted,
}: SortBookButtonProps) {
  const [dispatch, { loading }] = useMutation(PROCESS_BOOK, {
    variables: { bookId },
    update(cache, { data: { processBook } }) {
      if (processBook.__typename != 'Success') return;

      cache.modify({
        id: `Item:${processBook.id}`,
        fields: {
          rentable(previousValue = {}) {
            return {
              ...previousValue,
              stateTags: ['Available'],
            };
          },
        },
      });
    },
    onCompleted: ({ processBook }) => {
      const error = checkMutationContainErrors(processBook);
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

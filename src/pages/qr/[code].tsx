import React, { ChangeEvent, useEffect, useState } from 'react';

import Link from 'next/link';

import { Perm } from 'code-library-perms';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PrimaryButton } from '@/components/PrimaryButton';
import { gql, useMutation, useQuery } from '@apollo/client';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { DividerWithText } from '@/components/DividerWithText';
import { useShelf } from '@/hooks/use-shelf.hook';
import {
  Book,
  checkMutationContainErrors,
} from '@/services/code-library-server';

const GET_BOOK_BY_QR_CODE = gql`
  query GetBookByQR($qrId: ID!) {
    getBookByQr(qrId: $qrId) {
      _id
    }
  }
`;

const CONNECT_BOOK_VIA_QR_CODE = gql`
  mutation CreateQR($qrId: ID!, $bookId: ID!) {
    linkQr(qrId: $qrId, mediaId: $bookId) {
      ... on Success {
        id
      }

      ... on MissingPermissionsError {
        msg
        requiredPermsInt
      }

      ... on Error {
        msg
      }
    }
  }
`;

type Error =
  | {
      title: string;
      description: string;
    }
  | undefined;

function useQrConnection(): [
  (options: any) => any,
  { loading: boolean; data: any; error: Error }
] {
  const [connect, { loading, data, error }] = useMutation(
    CONNECT_BOOK_VIA_QR_CODE
  );

  let allErrors: Error;
  if (data?.linkQr?.__typename) {
    allErrors = checkMutationContainErrors(data?.linkQr);
  }

  if (error) {
    allErrors = {
      title: 'Internal Server Error',
      description: error.message,
    };
  }

  return [connect, { loading, data: data?.linkQr, error: allErrors }];
}

const InternalServerErrorMessage = () => (
  <>
    <Text>Something went wrong while trying to process your request.</Text>
    <Text alignContent={'center'}>Please try again later!</Text>
  </>
);

const InsufficientPermissionsErrorMessage = ({
  description,
}: {
  description: string;
}) => (
  <>
    <Text>
      Unfortunately you do not have the rights to perform this operation.
    </Text>
    <Text fontWeight={'semibold'}>{description}</Text>
  </>
);

const ApplicationErrorMessage = ({
  description,
  selectedBookTitle,
}: {
  description: string;
  selectedBookTitle: string;
}) => (
  <>
    <Text fontWeight={'semibold'}>{description}</Text>
    <Text textAlign={'center'} fontSize={'small'}>
      {`"${selectedBookTitle}"`}
    </Text>
  </>
);

const ErrorMessage = ({
  error,
  selectedBookTitle,
}: {
  error: { title: string; description: string };
  selectedBookTitle: string;
}) => {
  if (error.title === 'Unauthorized') {
    return (
      <InsufficientPermissionsErrorMessage description={error.description} />
    );
  }

  if (error.title === 'Internal Error') {
    return (
      <ApplicationErrorMessage
        description={error.description}
        selectedBookTitle={selectedBookTitle}
      />
    );
  }

  return <InternalServerErrorMessage />;
};

function Error({ error, selectedBookTitle }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => onOpen(), [onOpen]);

  const notFatal = error.title !== 'Internal Server Error';

  return (
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      closeOnEsc={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={'sm'}
    >
      <ModalOverlay />
      <ModalContent textAlign={'center'}>
        <Stack spacing={4} align={'center'} my={8} p={6}>
          <WarningTwoIcon w={14} h={14} color={'red.300'} />
          <Text fontWeight={'semibold'}>Oh snap...</Text>
          <ErrorMessage error={error} selectedBookTitle={selectedBookTitle} />
        </Stack>
        <ModalFooter textAlign={'center'}>
          <Stack w={'100%'}>
            {notFatal && (
              <Button variant={'outline'} onClick={onClose}>
                Close
              </Button>
            )}
            <DividerWithText>or</DividerWithText>
            <Stack direction={'row'} justify={'space-between'}>
              <Link href={'/shelf'} passHref>
                <Button w={'100%'}>Explore our shelf</Button>
              </Link>
            </Stack>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function QrCodePage() {
  const { query, push, replace } = useRouter();

  const qrId = query.code as string;

  const {
    loading,
    error: queryBookByQrError,
    data,
  } = useQuery(GET_BOOK_BY_QR_CODE, {
    variables: { qrId },
  });

  const { loading: optionsAreLoading, books } = useShelf();

  const [bookId, setBookId] = useState('');

  const [selectedBookTitle, setSelectedBookTitle] = useState('');

  const [errors, setErrors] = useState<Error>(undefined);

  const [connect, { ...qrConnectionStatus }] = useQrConnection();

  useEffect(() => {
    if (queryBookByQrError) {
      setErrors({
        title: 'Internal Server Error',
        description: queryBookByQrError.message,
      });
    }

    if (qrConnectionStatus.error) {
      setErrors(qrConnectionStatus.error);
    }
  }, [queryBookByQrError, qrConnectionStatus.error]);

  if (data?.getBookByQr) {
    push({
      pathname: '/books/[id]',
      query: { id: data?.getBookByQr?._id },
    });
  }

  if (qrConnectionStatus.data?.__typename === 'Success') {
    replace({
      pathname: '/books/[id]',
      query: { id: bookId },
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    connect({
      variables: {
        qrId,
        bookId: bookId,
      },
    });
  };

  if (loading) {
    return null;
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newBookId = e.target.value;
    const selectedBook = books.find((book) => book.id === newBookId) as Book;
    setBookId(newBookId);
    setSelectedBookTitle(selectedBook?.title);
  };

  const yo = data?.getBookByQr === null && !optionsAreLoading;

  return (
    <>
      {errors && <Error error={errors} selectedBookTitle={selectedBookTitle} />}
      {yo && (
        <Stack spacing={6} width="100%">
          <Stack
            spacing={8}
            mx={'auto'}
            w={'100%'}
            maxW={'700'}
            px={[4, 8]}
            textAlign={'center'}
          >
            <Heading as={'h1'} fontSize={'3xl'}>
              Unregistered Book
            </Heading>
            <Text fontSize={'lg'}>
              This book is not yet connected to our database via a QR code. You
              can help us by adding it through the form below.
            </Text>
            <Stack as={'form'} w={'100%'} onSubmit={onSubmit}>
              <FormControl>
                <FormLabel htmlFor="text">Book ID</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={onChange}
                  value={bookId}
                >
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </Select>
                <FormHelperText>Select which title to connect</FormHelperText>
              </FormControl>
              <PrimaryButton
                type={'submit'}
                p={'6'}
                isDisabled={bookId.length < 3}
              >
                Save
              </PrimaryButton>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

QrCodePage.title = 'QR Code';
QrCodePage.permissions = Perm.VIEW_BOOKS;

export default QrCodePage;

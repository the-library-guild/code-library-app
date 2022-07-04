import React, { useEffect, useState } from 'react';

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
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PrimaryButton } from '@/components/PrimaryButton';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useColorModeVariant } from '@/hooks/use-color-mode-variant.hook';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { DividerWithText } from '@/components/DividerWithText';
import { useShelf } from '@/hooks/use-shelf.hook';

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

function useQrConnection(): [
  (options: any) => any,
  { loading: boolean; data: any }
] {
  const [connect, { loading, data }] = useMutation(CONNECT_BOOK_VIA_QR_CODE);

  return [connect, { loading, data: data?.linkQr }];
}

function Loading() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lightOrDark = useColorModeVariant();

  useEffect(() => onOpen(), [onOpen]);

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
      <ModalHeader textAlign={'center'}>Hold tight!</ModalHeader>
      <ModalContent>
        <Stack justify={'center'} align={'center'} height={240} spacing={8}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            color={lightOrDark('gray.600', 'gray.300')}
            size="xl"
          />
          <Text fontSize={'xs'}>
            We are searching for this book in our database...
          </Text>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

function Error() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => onOpen(), [onOpen]);

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
          <Text>
            Something went wrong while trying to process your request.
          </Text>
          <Text alignContent={'center'}>Please try again later!</Text>
        </Stack>
        <ModalFooter textAlign={'center'}>
          <Stack w={'100%'}>
            <DividerWithText>or</DividerWithText>
            <Link href={'/shelf'} passHref>
              <Button w={'100%'}>Meanwhile, explore our shelf</Button>
            </Link>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function QrCodePage() {
  const { query, push, reload } = useRouter();

  const qrId = query.code as string;

  const { loading, error, data } = useQuery(GET_BOOK_BY_QR_CODE, {
    variables: { qrId },
  });

  const { loading: optionsAreLoading, books } = useShelf();

  const [bookId, setBookId] = useState('');

  const [connect, { ...qrConnectionStatus }] = useQrConnection();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (data?.getBookByQr) {
    push({
      pathname: '/books/[id]',
      query: { id: data?.getBookByQr?._id },
    });
  }

  if (qrConnectionStatus.data?.__typename === 'Success') {
    reload();
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

  const yo = data?.getBookByQr === null && !optionsAreLoading;

  return (
    <>
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
                  onChange={(e) => setBookId(e.target.value)}
                  value={bookId}
                >
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </Select>
                <FormHelperText>i.e. A11Y01</FormHelperText>
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

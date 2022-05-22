import React, { useEffect } from 'react';

import {
  Modal,
  ModalContent,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useColorModeVariant } from '@/hooks/use-color-mode-variant.hook';

type LoadingOverlay = {
  loading: boolean;
  helpText?: string;
};

export function LoadingOverlay({ loading, helpText }: LoadingOverlay) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lightOrDark = useColorModeVariant();

  useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading, onOpen, onClose]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior={'outside'}
        size={'full'}
      >
        <ModalContent bg={'none'}>
          <Stack justify={'center'} align={'center'} minH={'100vh'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              color={lightOrDark('gray.600', 'gray.300')}
              size="xl"
            />
            {helpText && <Text fontSize={'xs'}>{helpText}</Text>}
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

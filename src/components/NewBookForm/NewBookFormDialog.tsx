import React, { useContext, createContext, ReactNode } from 'react';

import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '@/components/NewBookForm';
import { useToasts } from '@/hooks/use-toasts';

type NewBookFormDialogProps = {
  children: ReactNode;
};

type ModalContextValue = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue);

export function NewBookFormDialog({ children }: NewBookFormDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { showError, showSuccess } = useToasts();

  const onSuccess = ({ newId }) => {
    showSuccess({
      title: 'Success',
      description: `New book ${newId} created!`,
    });
    onClose();
  };

  const onError = ({ title, description }) => {
    showError({
      title,
      description,
    });
  };

  const value = { isOpen, onOpen, onClose };

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'inside'}
        isCentered
        size={useBreakpointValue({ base: 'full', md: 'sm' })}
      >
        <ModalOverlay />
        <ModalContent maxW={700} bg={useColorModeValue('white', 'gray.900')}>
          <ModalHeader>New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewBookForm onSuccess={onSuccess} onError={onError} />
          </ModalBody>
          <ModalFooter>
            <NewBookFormControls>
              <Button onClick={onClose}>Cancel</Button>
              <NewBookFormSubmissionButton>Create</NewBookFormSubmissionButton>
            </NewBookFormControls>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const useModal = () => useContext(ModalContext);

export function NewBookFormDialogButton({ children, ...rest }: ButtonProps) {
  const { onOpen } = useModal();

  return (
    <Tooltip label={'Add new book to shelf'}>
      <Button onClick={onOpen} variant={'outline'} {...rest}>
        {children}
      </Button>
    </Tooltip>
  );
}

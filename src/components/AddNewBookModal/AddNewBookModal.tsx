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
  NewBookFormOnSubmit,
  NewBookFormValues,
  NewBookFormSubmissionButton,
} from '@/components/NewBookForm';

type AddNewBookModalProps = {
  onSubmit: NewBookFormOnSubmit;
  children: ReactNode;
};

type ModalContextValue = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  onOpen: () => {
    return;
  },
  onClose: () => {
    return;
  },
});

export function AddNewBookModal({ onSubmit, children }: AddNewBookModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value = { isOpen, onOpen, onClose };

  const submitAndClose = async (values: NewBookFormValues) => {
    await onSubmit(values);
    onClose();
  };

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
            <NewBookForm onSubmit={submitAndClose} />
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

export function AddNewBookModalButton({ children, ...rest }: ButtonProps) {
  const { onOpen } = useModal();

  return (
    <>
      <Tooltip label={'Add new book to shelf'}>
        <Button onClick={onOpen} variant={'outline'} {...rest}>
          {useBreakpointValue({ base: '+', md: children })}
        </Button>
      </Tooltip>
    </>
  );
}

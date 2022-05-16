import React, { ReactElement } from 'react';

import {
  Button,
  ButtonProps,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormOnSubmit,
  NewBookFormSubmissionButton,
} from '../NewBookForm/NewBookForm';

import { FaPlus } from 'react-icons/fa';

type AddNewBookModalChildrenProps = {
  onOpen: () => void;
};

type AddNewBookModalProps = {
  onSubmit: NewBookFormOnSubmit;
  children: (props: AddNewBookModalChildrenProps) => ReactElement;
};

export function AddNewBookModal({ onSubmit, children }: AddNewBookModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children({ onOpen })}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'inside'}
        isCentered
        size={useBreakpointValue({ base: 'full', md: 'sm' })}
      >
        <ModalOverlay />
        <ModalContent maxW={700}>
          <ModalHeader>New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewBookForm onSubmit={onSubmit} onSuccess={onClose} />
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

type AddNewBookModalButtonProps = ButtonProps & {
  onOpen: () => void;
};

export function AddNewBookModalButton({
  onOpen,
  children,
  ...rest
}: AddNewBookModalButtonProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Tooltip label={'Add new book to shelf'}>
          <IconButton
            onClick={onOpen}
            variant={'ghost'}
            aria-label={'Add new book to shelf'}
            icon={<FaPlus />}
          />
        </Tooltip>
      ) : (
        <Button onClick={onOpen} variant={'outline'} {...rest}>
          {children}
        </Button>
      )}
    </>
  );
}

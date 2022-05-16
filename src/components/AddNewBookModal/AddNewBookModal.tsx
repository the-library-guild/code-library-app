import React from 'react';

import {
  Button,
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

type AddNewBookModalProps = {
  onSubmit: NewBookFormOnSubmit;
};

export function AddNewBookModal({ onSubmit }: AddNewBookModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button onClick={onOpen} variant={'outline'}>
          Add new book
        </Button>
      )}

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

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';

import {
  useDisclosure,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';

import { useColorModeVariant } from '@/hooks/use-color-mode-variant.hook';
import { WarningTwoIcon } from '@chakra-ui/icons';
import CodeLibraryServer from '@/services/code-library-server';

const ActionStatusContext = createContext({} as any);

export function useActionStatusContext() {
  return useContext(ActionStatusContext);
}

export function ActionStatusDialogHeader({ children }: PropsWithChildren) {
  return <ModalHeader textAlign={'center'}>{children}</ModalHeader>;
}
export function ActionStatusDialogBody({ children }: PropsWithChildren) {
  return <ModalBody textAlign={'center'}>{children}</ModalBody>;
}
export function ActionStatusDialogFooter({ children }: PropsWithChildren) {
  return <ModalFooter textAlign={'center'}>{children}</ModalFooter>;
}

const DefaultFallback = () => {
  const lightOrDark = useColorModeVariant();

  return (
    <>
      <ActionStatusDialog.Header>Hold tight!</ActionStatusDialog.Header>
      <ActionStatusDialog.Body>
        <Stack justify={'center'} align={'center'} height={240}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            color={lightOrDark('gray.600', 'gray.300')}
            size="xl"
          />
          <Text fontSize={'xs'}>We are processing your request...</Text>
        </Stack>
      </ActionStatusDialog.Body>
    </>
  );
};

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

const ErrorMessage = ({
  error,
}: {
  error: { title: string; description: string };
}) => {
  if (error.title === 'Unauthorized') {
    return (
      <InsufficientPermissionsErrorMessage description={error.description} />
    );
  }

  return <InternalServerErrorMessage />;
};

const DefaultError = () => {
  const { error, onCompleted } = useActionStatusContext();

  return (
    <>
      <ActionStatusDialogBody>
        <Stack spacing={4} align={'center'} my={8}>
          <WarningTwoIcon w={14} h={14} color={'red.300'} />
          <Text fontWeight={'semibold'}>Oh snap...</Text>
          <ErrorMessage error={error} />
        </Stack>
      </ActionStatusDialogBody>
      <ActionStatusDialogFooter>
        <Button w={'100%'} onClick={onCompleted}>
          Close
        </Button>
      </ActionStatusDialogFooter>
    </>
  );
};

type ActionStatusDialogProps = {
  loading: boolean;
  error: any | undefined;
  fallback?: ReactElement;
  onSuccess: ReactElement;
  onError?: ReactElement;
  onEnd: () => any;
  show?: boolean;
};

const ActionStatusDialogContext = createContext({} as any);

export function useActionStatusDialogContext() {
  return useContext(ActionStatusDialogContext);
}

export function ActionStatusContextProvider({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value = {
    onOpen,
    onClose,
    isOpen,
  };

  return (
    <ActionStatusDialogContext.Provider value={value}>
      {children}
    </ActionStatusDialogContext.Provider>
  );
}

export function ActionStatusDialog({
  loading,
  error,
  show = false,
  fallback = <DefaultFallback />,
  onSuccess,
  onError = <DefaultError />,
  onEnd,
}: ActionStatusDialogProps) {
  const { isOpen, onOpen, onClose } = useActionStatusDialogContext();

  const onCompleted = () => {
    onEnd();
    onClose();
    CodeLibraryServer.refetchQueries({ include: ['GetUserBooks'] });
  };

  const modalSize = useBreakpointValue({ base: 'xs', md: 'lg' });

  const value = {
    onOpen,
    onClose,
    onCompleted,
    isOpen: isOpen || show,
    loading,
    error,
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        closeOnEsc={false}
        isOpen={value.isOpen}
        onClose={onClose}
        isCentered
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <ActionStatusContext.Provider value={value}>
            {error ? onError : loading ? fallback : onSuccess}
          </ActionStatusContext.Provider>
        </ModalContent>
      </Modal>
    </>
  );
}

ActionStatusDialog.Header = ActionStatusDialogHeader;
ActionStatusDialog.Body = ActionStatusDialogBody;
ActionStatusDialog.Footer = ActionStatusDialogFooter;

export default ActionStatusDialog;

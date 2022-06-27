import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
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
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useColorModeVariant } from '@/hooks/use-color-mode-variant.hook';
import { WarningTwoIcon } from '@chakra-ui/icons';

const ActionStatusDialogContext = createContext({} as any);

export function useActionStatusDialogContext() {
  return useContext(ActionStatusDialogContext);
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

const DefaultError = () => (
  <>
    <ModalHeader textAlign={'center'}>Oh snap...</ModalHeader>
    <ActionStatusDialog.Body>
      <Stack spacing={2} align={'center'}>
        <WarningTwoIcon w={12} h={12} color={'red.300'} />
        <Text fontWeight={'semibold'}>
          Something went wrong while trying to process your request 😢
        </Text>
      </Stack>
    </ActionStatusDialog.Body>
    <ActionStatusDialog.Footer>
      <Text>
        Please try again later or contact{' '}
        <Link href="mailto:admin.library@code.berlin" color={'blue.300'}>
          admin.library@code.berlin
        </Link>
      </Text>
    </ActionStatusDialog.Footer>
  </>
);

type ActionStatusDialogProps = {
  loading: boolean;
  error: any | undefined;
  fallback?: ReactElement;
  onSuccess: ReactElement;
  onError?: ReactElement;
};

export function ActionStatusDialog({
  loading,
  error,
  fallback = <DefaultFallback />,
  onSuccess,
  onError = <DefaultError />,
}: ActionStatusDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (loading) {
      onOpen();
    }
  }, [loading, onOpen]);

  const modalSize = useBreakpointValue({ base: 'xs', md: 'lg' });

  const value = {
    onOpen,
    onClose,
    isOpen,
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <ActionStatusDialogContext.Provider value={value}>
            {error ? onError : loading ? fallback : onSuccess}
          </ActionStatusDialogContext.Provider>
        </ModalContent>
      </Modal>
    </>
  );
}

ActionStatusDialog.Header = ActionStatusDialogHeader;
ActionStatusDialog.Body = ActionStatusDialogBody;
ActionStatusDialog.Footer = ActionStatusDialogFooter;

export default ActionStatusDialog;

import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';

import { LoadingOverlay } from '@/components/LoadingOverlay';
import { fromFieldsToValues, resetValues } from '.';
import { useCreateBook } from '@/services/code-library-server';

export type NewBookSubmissionResponse = {
  success: boolean;
  error: { message: string } | null;
  loading: boolean;
};

export type NewBookFormOnSubmit = (
  values: NewBookFormValues
) => Promise<Record<string, any>> | Record<string, any> | void;

export type NewBookFormProps = {
  onSubmit: NewBookFormOnSubmit;
  children?: ReactNode;
};

export type NewBookFormValues = {
  bookId: string;
  mainTitle: string;
  subTitle: string;
  author: string;
  publisher: string;
  publicationYear: number;
  language: string;
  subject: string[];
};

const NewBookFormContext = createContext({ submitting: false });

export function NewBookForm({ onSubmit, children }: NewBookFormProps) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmission(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;

    const entries = fromFieldsToValues(fields) as NewBookFormValues;

    setSubmitting(true);

    await onSubmit({ ...entries });

    setSubmitting(false);

    resetValues(fields);
  }

  return (
    <Stack spacing={4} align={'center'} w={'100%'}>
      <LoadingOverlay loading={submitting} helpText={'Creating'} />
      <form
        id="new-book-form"
        role={'form'}
        style={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmission}
      >
        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="book-id">Book ID</FormLabel>
          <Input type="text" name="bookId" id="book-id" placeholder="STS17" />
          <FormErrorMessage>Book ID is requried</FormErrorMessage>
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="main-title">Main Title</FormLabel>
          <Input
            type="text"
            name="mainTitle"
            id="main-title"
            placeholder="La radiologie et la guerre"
          />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="sub-title">Sub Title</FormLabel>
          <Input
            type="text"
            name="subTitle"
            id="sub-title"
            placeholder="Depuis la découverte des rayons X, en 1895, les méthodes de la radiologie, progressivement élaborées par les médecins, ont été appliquées avec succès sous la forme de radio-diagnostic et de radiothérapie."
          />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            type="text"
            name="author"
            id="author"
            placeholder="Marie Curie"
          />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="publisher">Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            id="publisher"
            placeholder="Library of Alexandria"
          />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="publication-year">Year of Publication</FormLabel>
          <Input
            type="text"
            name="publicationYear"
            id="publication-year"
            placeholder="1921"
          />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="language">Language</FormLabel>
          <Input type="text" name="language" id="language" placeholder="fr" />
        </FormControl>

        <FormControl isDisabled={submitting}>
          <FormLabel htmlFor="subject">Subject Area</FormLabel>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="War story/Fantasy"
          />
        </FormControl>
      </form>
      <NewBookFormContext.Provider value={{ submitting }}>
        {children}
      </NewBookFormContext.Provider>
    </Stack>
  );
}

export function NewBookFormControls({ children, ...rest }: FlexProps) {
  return (
    <Flex justify={'flex-end'} gap={2} w={'100%'} {...rest}>
      {children}
    </Flex>
  );
}

export function NewBookFormSubmissionButton({
  children,
  ...rest
}: ButtonProps) {
  const { submitting } = useContext(NewBookFormContext);

  return (
    <Button
      form="new-book-form"
      type={'submit'}
      bg={'primary.100'}
      color={'gray.900'}
      _hover={{
        color: 'gray.100',
      }}
      isDisabled={submitting}
      {...rest}
    >
      {children}
    </Button>
  );
}

export function NewBookFormLoader({ children }: { children: ReactNode }) {
  const { createBook, ...status } = useCreateBook();

  const toast = useToast();

  useEffect(() => {
    if (status.loading) {
      return;
    }

    if (status.error) {
      toast({
        title: 'Error',
        description: status.error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'top-accent',
      });
    }

    if (status.data) {
      const { __typename: type, ...other } = status.data.createBook;

      switch (type) {
        case 'Success':
          toast({
            title: 'Sucess',
            description: `New book ${other.id} created!`,
            status: 'success',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
            variant: 'top-accent',
          });
          break;
        case 'MissingPermissionsError':
          toast({
            title: 'Unauthorized',
            description: other.msg,
            status: 'error',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
            variant: 'top-accent',
          });
          break;
        default:
          toast({
            title: 'Error',
            description: other.msg,
            status: 'error',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
            variant: 'top-accent',
          });
          break;
      }
    }
  }, [status, toast]);

  return (
    <>
      <NewBookForm onSubmit={createBook}>{children}</NewBookForm>
    </>
  );
}

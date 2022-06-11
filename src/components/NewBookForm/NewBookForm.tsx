import {
  ChangeEvent,
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
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
} from '@chakra-ui/react';

import { LoadingOverlay } from '@/components/LoadingOverlay';

import { useCreateBook } from '@/services/code-library-server';

import { fromFieldsToValues, resetValues } from './NewBookForm.helpers';

type OnErrorArgs = {
  title: string;
  description: string;
};

type OnSuccessArgs = { newId: string };

export type NewBookFormProps = {
  onSuccess?: ({ newId }: OnSuccessArgs) => void;
  onError?: ({ title, description }: OnErrorArgs) => void;
  children?: ReactNode;
};

export type NewBookFormValues = {
  bookId: string;
  designation: string;
  mainTitle: string;
  subTitle: string;
  author: string;
  publisher: string;
  publicationYear: number;
  language: string;
  subject: string[];
};

const NewBookFormContext = createContext({
  submitting: false,
});

const doNothing = () => {
  return;
};

export function NewBookForm({
  onSuccess = doNothing,
  onError = doNothing,
  children,
}: NewBookFormProps) {
  const { createBook, ...status } = useCreateBook();

  const [values, setValues] = useState({ bookId: '', designation: '' });

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;

    const entries = fromFieldsToValues(fields) as NewBookFormValues;

    try {
      await createBook({ ...entries });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  useEffect(() => {
    if (status.success && formRef.current) {
      const { ...fields } = formRef.current.elements;
      resetValues(fields);
      onSuccess({ ...status.success });
    }

    if (status.error) {
      onError({ ...status.error });
    }
  }, [formRef, onSuccess, onError, status]);

  const deriveDesignationFromBookId = (bookId: string) => {
    if (bookId.startsWith('A11Y')) {
      return 'A11Y';
    }

    if (bookId.startsWith('DH')) {
      return 'DH';
    }

    if (bookId.startsWith('ENT')) {
      return 'ENT';
    }

    if (bookId.startsWith('ID')) {
      return 'ID';
    }

    if (bookId.startsWith('IS')) {
      return 'IS';
    }

    if (bookId.startsWith('PM')) {
      return 'PM';
    }

    if (bookId.startsWith('STS')) {
      return 'STS';
    }

    if (bookId.startsWith('SE')) {
      return 'SE';
    }

    if (bookId.startsWith('SUS')) {
      return 'SUS';
    }

    return '';
  };

  const onBookIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const bookId = e.target.value as string;
    const designation = deriveDesignationFromBookId(bookId);

    setValues((prev) => ({
      ...prev,
      bookId,
      designation,
    }));
  };

  return (
    <Stack spacing={4} align={'center'} w={'100%'}>
      <LoadingOverlay loading={status.loading} helpText={'Creating'} />
      <form
        id="new-book-form"
        role={'form'}
        ref={formRef}
        style={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmission}
      >
        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="book-id">Book ID</FormLabel>
          <Input
            type="text"
            name="bookId"
            id="book-id"
            placeholder="STS17"
            value={values.bookId}
            onChange={onBookIdChange}
          />
          <FormErrorMessage>Book ID is requried</FormErrorMessage>
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="designation">Designation</FormLabel>
          <Input
            type="text"
            name="designation"
            id="designation"
            placeholder="i.e., STS, SE, PM"
            value={values.designation}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, designation: e.target.value }))
            }
          />
          <FormErrorMessage>Designation is requried</FormErrorMessage>
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="main-title">Main Title</FormLabel>
          <Input
            type="text"
            name="mainTitle"
            id="main-title"
            placeholder="La radiologie et la guerre"
          />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="sub-title">Sub Title</FormLabel>
          <Input
            type="text"
            name="subTitle"
            id="sub-title"
            placeholder="Depuis la découverte des rayons X, en 1895, les méthodes de la radiologie, progressivement élaborées par les médecins, ont été appliquées avec succès sous la forme de radio-diagnostic et de radiothérapie."
          />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            type="text"
            name="author"
            id="author"
            placeholder="Marie Curie"
          />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="publisher">Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            id="publisher"
            placeholder="Library of Alexandria"
          />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="publication-year">Year of Publication</FormLabel>
          <Input
            type="text"
            name="publicationYear"
            id="publication-year"
            placeholder="1921"
          />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="language">Language</FormLabel>
          <Input type="text" name="language" id="language" placeholder="fr" />
        </FormControl>

        <FormControl isDisabled={status.loading}>
          <FormLabel htmlFor="subject">Subject Area</FormLabel>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="War story/Fantasy"
          />
        </FormControl>
      </form>
      <NewBookFormContext.Provider value={{ submitting: status.loading }}>
        {children}
      </NewBookFormContext.Provider>
    </Stack>
  );
}

export function useNewBookForm() {
  return useContext(NewBookFormContext);
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
  const { submitting } = useNewBookForm();

  return (
    <Button
      form="new-book-form"
      type={'submit'}
      bg={'primary.100'}
      color={'gray.900'}
      isDisabled={submitting}
      _hover={{ color: 'gray.100' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

function Field({ loading, id, placeholder, children }) {
  const name = (id: string) => id.replace(/-./g, (x) => x[1].toUpperCase());

  return (
    <FormControl isDisabled={loading}>
      <FormLabel htmlFor={id}>{children}</FormLabel>
      <Input type="text" name={name(id)} id={id} placeholder={placeholder} />
    </FormControl>
  );
}

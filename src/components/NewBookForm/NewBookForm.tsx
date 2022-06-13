import {
  ChangeEvent,
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
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

import {
  deriveDesignationFromBookId,
  fromFieldsToValues,
  resetValues,
} from './NewBookForm.helpers';

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
  const [submission, { values, initialInputRef, formRef }] =
    useNewBookFormSubmission();

  async function handleSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;
    const entries = fromFieldsToValues(fields) as NewBookFormValues;

    submission.start();

    try {
      await createBook({ ...entries });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  useEffect(() => {
    if (submission.pending && status.success) {
      onSuccess({ ...status.success });
      submission.end();
      submission.reset();
    }
  }, [onSuccess, status, submission]);

  useEffect(() => {
    if (submission.pending && status.error) {
      onError({ ...status.error });
      submission.end();
    }
  }, [onError, status, submission]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value as string;

    if (name === 'bookId') {
      const designation = deriveDesignationFromBookId(value);
      return submission.setValues((prev) => ({
        ...prev,
        [name]: value,
        designation,
      }));
    }

    return submission.setValues((prev) => ({
      ...prev,
      [name]: value,
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
            ref={initialInputRef}
            type="text"
            name="bookId"
            id="book-id"
            placeholder="STS17"
            value={values.bookId}
            onChange={(e) => onChange(e, 'bookId')}
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
            onChange={(e) => onChange(e, 'designation')}
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
      <NewBookFormContext.Provider value={{ submitting: submission.pending }}>
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

const initialValues = { bookId: '', designation: '' };

function useNewBookFormSubmission() {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const initialInputRef = useRef<HTMLInputElement>(null);

  const handlers = useMemo(
    () => ({
      start: () => setSubmitting(true),
      end: () => setSubmitting(false),
      pending: submitting,
      setValues,
      reset: () => {
        if (formRef.current) {
          const { ...fields } = formRef.current.elements;
          resetValues(fields);
        }
        setValues(initialValues);
      },
    }),
    [submitting]
  );

  useEffect(() => {
    if (initialInputRef.current) {
      initialInputRef.current.focus();
    }
  }, [initialInputRef]);

  return [handlers, { values, formRef, initialInputRef }] as const;
}

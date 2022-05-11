import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';

import { SyntheticEvent, useState } from 'react';

type NewBookSubmissionResponse = {
  success: boolean;
  error: { message: string } | null;
  loading: boolean;
};

export type NewBookFormProps = {
  onSubmit: (
    values: NewBookFormValues
  ) => Promise<NewBookSubmissionResponse> | NewBookSubmissionResponse;
  onCancel: () => void;
};

export type NewBookFormValues = {
  bookId: string;
  mainTitle: string;
  subTitle: string;
  author: string;
  publisher: string;
  publicationYear: number;
  language: string;
  subject: string;
};

interface FormField extends Element {
  name?: string | undefined;
  value?: any | undefined;
}

const asNumber = (field: FormField) => {
  const now = () => Number(field?.value);
  const ifMatches = (match: string) => {
    if (field?.name === match) {
      return now();
    }

    return field?.value;
  };
  return {
    now,
    ifMatches,
  };
};

function NewBookForm({ onSubmit, onCancel }: NewBookFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();

  async function handleSubmission(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;

    const entries = Object.values(fields).reduce((curr, field) => {
      if (field?.name == '') return curr;

      return {
        ...curr,
        [field?.name]: asNumber(field).ifMatches('publicationYear'),
      };
    }, {}) as unknown as NewBookFormValues;

    const { error, success, loading } = await onSubmit({ ...entries });

    if (loading) {
      setSubmitting(true);
    }

    if (error) {
      setSubmitting(false);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'top-accent',
      });
    }

    if (success) {
      setSubmitting(false);
      toast({
        title: 'Success',
        description: 'New book successfully added to the shelf!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'top-accent',
      });
    }
  }

  return (
    <Stack spacing={8} align={'center'}>
      <Heading size={'lg'}>New Book</Heading>

      <form
        id="new-book-form"
        role={'form'}
        onSubmit={handleSubmission}
        style={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
        }}
      >
        <FormControl>
          <FormLabel htmlFor="book-id">Book ID</FormLabel>
          <Input type="text" name="bookId" id="book-id" placeholder="STS17" />
          <FormErrorMessage>Book ID is requried</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="main-title">Main Title</FormLabel>
          <Input
            type="text"
            name="mainTitle"
            id="main-title"
            placeholder="La radiologie et la guerre"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="sub-title">Sub Title</FormLabel>
          <Input
            type="text"
            name="subTitle"
            id="sub-title"
            placeholder="Depuis la découverte des rayons X, en 1895, les méthodes de la radiologie, progressivement élaborées par les médecins, ont été appliquées avec succès sous la forme de radio-diagnostic et de radiothérapie."
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            type="text"
            name="author"
            id="author"
            placeholder="Marie Curie"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="publisher">Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            id="publisher"
            placeholder="Library of Alexandria"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="publication-year">Year of Publication</FormLabel>
          <Input
            type="text"
            name="publicationYear"
            id="publication-year"
            placeholder="1921"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="language">Language</FormLabel>
          <Input type="text" name="language" id="language" placeholder="fr" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="subject">Subject Area</FormLabel>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="War story/Fantasy"
          />
        </FormControl>
      </form>
      <Flex justify={'flex-end'} gap={2} w={'100%'}>
        <Button size={'lg'} onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button
          form="new-book-form"
          type={'submit'}
          isLoading={submitting}
          loadingText="Submitting"
          size={'lg'}
          bg={'primary.100'}
          color={'gray.900'}
          _hover={{
            color: 'gray.100',
          }}
        >
          Create
        </Button>
      </Flex>
    </Stack>
  );
}

export { NewBookForm };

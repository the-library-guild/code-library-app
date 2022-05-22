import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

import { ReactNode, SyntheticEvent, useState } from 'react';
import { valueOf } from './NewBookForm.helpers';

export type NewBookSubmissionResponse = {
  success: boolean;
  error: { message: string } | null;
  loading: boolean;
};

export type NewBookFormOnSubmit = (
  values: NewBookFormValues
) => Promise<void> | void;

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
  subject: string;
};

export function NewBookForm({ onSubmit, children }: NewBookFormProps) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmission(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;

    const entries = Object.values(fields).reduce((curr, field) => {
      const fieldIsNotAnInput = !(field instanceof HTMLInputElement);
      if (fieldIsNotAnInput) return curr;

      const fieldNameIsEmpty = field.name == '';
      if (fieldNameIsEmpty) return curr;

      return {
        ...curr,
        [field.name]: valueOf(field),
      };
    }, {}) as NewBookFormValues;

    setSubmitting(true);

    await onSubmit({ ...entries });

    setSubmitting(false);
  }

  return (
    <Stack spacing={4} align={'center'}>
      <Skeleton isLoaded={!submitting}>
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
            <FormLabel htmlFor="publication-year">
              Year of Publication
            </FormLabel>
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
      </Skeleton>
      {children}
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
  return (
    <Button
      form="new-book-form"
      type={'submit'}
      bg={'primary.100'}
      color={'gray.900'}
      _hover={{
        color: 'gray.100',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

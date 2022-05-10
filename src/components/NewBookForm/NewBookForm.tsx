import { FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { FormEvent } from 'react';

function NewBookForm() {
  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { ...fields } = event.currentTarget.elements;

    console.log(fields);
  };

  return (
    <form role={'form'} onSubmit={handleSubmission}>
      <Heading size={'lg'}>New Book</Heading>

      <FormControl>
        <FormLabel htmlFor="book-id">Book ID</FormLabel>
        <Input type="text" name="book-id" id="book-id" />
      </FormControl>

      <label htmlFor="main-title">Main Title</label>
      <input type="text" name="main-title" id="main-title" />

      <label htmlFor="sub-title">Sub Title</label>
      <input type="text" name="sub-title" id="sub-title" />

      <label htmlFor="author">Author</label>
      <input type="text" name="author" id="author" />

      <label htmlFor="publisher">Publisher</label>
      <input type="text" name="publisher" id="publisher" />

      <label htmlFor="publication-year">Year of Publication</label>
      <input type="text" name="publication-year" id="publication-year" />

      <label htmlFor="language">Language</label>
      <input type="text" name="language" id="language" />

      <label htmlFor="subject">Subject Area</label>
      <input type="text" name="subject" id="subject" />

      <input type="submit" value="Create" />
    </form>
  );
}

export { NewBookForm };

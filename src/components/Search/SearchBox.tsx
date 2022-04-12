import React from 'react';
import {
  FormControl,
  Input,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { RiSearchLine } from 'react-icons/ri';
interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBox({ searchTerm, setSearchTerm }: SearchBoxProps) {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      flexDirection="column"
      flexWrap={'wrap'}
    >
      <Flex
        as="label"
        p="2"
        w={'100%'}
        maxHeight={40}
        color={'gray.200'}
        border="1px solid"
        borderRadius="md"
        bg={useColorModeValue('white', 'gray.700')}
        align={'center'}
      >
        <Icon
          as={RiSearchLine}
          fontSize={'20'}
          color={useColorModeValue('green.500', 'gray.400')}
        />
        <Input
          type={'text'}
          width={'100%'}
          color={useColorModeValue('gray.500', 'gray.50')}
          variant={'unstyled'}
          placeholder="Search by title, author, or topic"
          px={'4'}
          _placeholder={{ color: 'gray.400', fontSize: '18' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
    </FormControl>
  );
}

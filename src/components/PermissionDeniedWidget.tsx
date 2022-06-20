import React, { PropsWithChildren } from 'react';

import Link from 'next/link';

import { Button, Icon, Stack, Text } from '@chakra-ui/react';

import { FaLock } from 'react-icons/fa';

const DEFAULT_TITLE = `Unfortunately you do not have access to this feature :(`;

type PermissionDeniedWidgetProps = PropsWithChildren<{
  title?: string;
}>;

export function PermissionDeniedWidget({
  title = DEFAULT_TITLE,
  children,
}: PermissionDeniedWidgetProps) {
  return (
    <Stack
      spacing={4}
      width={'100%'}
      maxW={500}
      margin={'0 auto'}
      align={'center'}
      p={8}
    >
      <Icon as={FaLock} w={8} h={8} />
      <Text fontSize={'lg'}>{title}</Text>
      <Text fontSize={'sm'} textAlign={'center'}>
        {children}
      </Text>
      <Link href={'/shelf'} passHref>
        <Button as={'a'} w={'100%'}>
          Explore our shelf
        </Button>
      </Link>
    </Stack>
  );
}

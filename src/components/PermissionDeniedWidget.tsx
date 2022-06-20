import React, { PropsWithChildren } from 'react';

import { Icon, Stack, Text } from '@chakra-ui/react';

import { FaLock } from 'react-icons/fa';

const DEFAULT_TEXT = `Unfortunately you do not have access to this feature :(`;

type PermissionDeniedWidgetProps = PropsWithChildren<{
  text?: string;
}>;

export function PermissionDeniedWidget({
  text = DEFAULT_TEXT,
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
      <Text fontSize={'lg'}>{text}</Text>
      {children}
    </Stack>
  );
}

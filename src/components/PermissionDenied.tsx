import React from 'react';

import { Stack, Text } from '@chakra-ui/react';

import { Content } from './Content';

export function PermissionDenied() {
  return (
    <Content>
      <Stack spacing={4} width="100%">
        <Text>Unfortunately you do not access this feature :(</Text>
      </Stack>
    </Content>
  );
}

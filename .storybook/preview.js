import { ChakraProvider } from "@chakra-ui/react"

import { initialize, mswDecorator } from 'msw-storybook-addon';

import { theme } from '../src/helpers/theme';
import { MakingAppContextProvider } from '../src/making-app-context';
import { handlers } from '../src/mocks/handlers';

initialize({ onUnhandledRequest: 'bypass' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  chakra: { theme },
  msw: {
    handlers: { ...handlers },
  },
}

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <MakingAppContextProvider>
        <Story />
      </MakingAppContextProvider>
    </ChakraProvider>
  ),
  mswDecorator
]

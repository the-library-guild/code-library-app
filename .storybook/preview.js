import { ChakraProvider } from "@chakra-ui/react"

import { theme } from '../src/helpers/theme';
import { MakingAppContextProvider } from '../src/making-app-context';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  chakra: { theme }
}

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <MakingAppContextProvider>
        <Story />
      </MakingAppContextProvider>
    </ChakraProvider>
  )
]

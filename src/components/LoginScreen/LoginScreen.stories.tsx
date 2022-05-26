import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginScreen } from '.';

export default {
  component: LoginScreen,
  title: 'Screens/Login',
} as ComponentMeta<typeof LoginScreen>;

const Template: ComponentStory<typeof LoginScreen> = (args) => (
  <LoginScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: undefined,
};

export const InternalServerError = Template.bind({});
InternalServerError.args = {
  error: ['Callback'],
};

export const InvalidCredentials = Template.bind({});
InvalidCredentials.args = {
  error: ['Signin'],
};

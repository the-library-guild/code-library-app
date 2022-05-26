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

export const InternalError = Template.bind({});
InternalError.args = {
  error: ['Callback'],
};

export const BadEmail = Template.bind({});
BadEmail.args = {
  error: ['Signin'],
};

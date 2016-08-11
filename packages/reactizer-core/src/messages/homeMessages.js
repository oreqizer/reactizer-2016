import { defineMessages } from 'react-intl';

export default defineMessages({
  welcome: {
    id: 'home.welcome',
    defaultMessage: 'Welcome',
  },
  description: {
    id: 'home.description',
    defaultMessage: 'This is a demo of {appName}, ...',
  },
  listIntro: {
    id: 'home.list_intro',
    defaultMessage: 'The demo contains:',
  },
  loginRegistration: {
    id: 'home.login_registration',
    defaultMessage: 'Login and registration',
    description: 'List item with the title "The demo contains:"',
  },
  todos: {
    id: 'home.todos',
    defaultMessage: 'Persistent todos',
    description: 'List item with the title "The demo contains:"',
  },
});

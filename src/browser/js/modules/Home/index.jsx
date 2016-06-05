import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import { List, ListItem } from 'material-ui';

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    defaultMessage: 'Welcome',
  },
  p1: {
    id: 'home.p1',
    defaultMessage: 'This is a demo of {appName}, with all the React has to offer in one package! ',
  },
  p2: {
    id: 'home.p2',
    defaultMessage: 'Be sure to check out the sidebar and explore this mini \'todo\' demo. ',
  },
  p3: {
    id: 'home.p3',
    defaultMessage: 'The registration and your todos are persistent, feel free to use at work.',
  },
  listIntro: {
    id: 'home.list_intro',
    defaultMessage: 'The demo contains:',
  },
  loginRegistration: {
    id: 'home.login_registration',
    defaultMessage: 'Login and registration',
  },
  todos: {
    id: 'home.todos',
    defaultMessage: 'Persistent todos',
  },
});

const Home = props =>
  <div className="Home markdown-body">
    <h1>
      <FormattedMessage {...messages.welcome} />
    </h1>
    <p>
      <FormattedMessage {...messages.p1} values={{ appName: props.appName }} />
      <FormattedMessage {...messages.p2} />
      <FormattedMessage {...messages.p3} />
    </p>
    <h4>
      <FormattedMessage {...messages.listIntro} />
    </h4>
    <List>
      <ListItem onTouchTap={() => props.push('/signup')}>
        <FormattedMessage {...messages.loginRegistration} />
      </ListItem>
      <ListItem onTouchTap={() => props.push('/todos')}>
        <FormattedMessage {...messages.todos} />
      </ListItem>
    </List>
  </div>;

Home.propTypes = {
  appName: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(state => ({
  appName: state.config.appName,
}), { push })(Home);

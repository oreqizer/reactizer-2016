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

const Home = props =>
  <div className="Home markdown-body">
    <h1>
      <FormattedMessage {...messages.welcome} />
    </h1>
    <p>
      <FormattedMessage {...messages.description} values={{ appName: props.appName }} />
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

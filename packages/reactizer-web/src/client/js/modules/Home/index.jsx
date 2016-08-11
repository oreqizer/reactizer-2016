import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import { List, ListItem } from 'material-ui';

import { homeMessages } from '../../../../universal/messages';

const Home = props =>
  <div className="Home markdown-body">
    <h1>
      <FormattedMessage {...homeMessages.welcome} />
    </h1>
    <p>
      <FormattedMessage {...homeMessages.description} values={{ appName: props.appName }} />
    </p>
    <h4>
      <FormattedMessage {...homeMessages.listIntro} />
    </h4>
    <List>
      <ListItem onTouchTap={() => props.push('/signup')}>
        <FormattedMessage {...homeMessages.loginRegistration} />
      </ListItem>
      <ListItem onTouchTap={() => props.push('/todos')}>
        <FormattedMessage {...homeMessages.todos} />
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

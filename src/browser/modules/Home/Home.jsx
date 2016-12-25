import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import { List, ListItem } from 'material-ui';

import { homeMessages } from '../../../universal/messages';


class Home extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.linkSignup = this.linkSignup.bind(this);
    this.linkTodos = this.linkTodos.bind(this);
  }

  linkSignup() {
    this.props.push('/signup');
  }

  linkTodos() {
    this.props.push('/todos');
  }

  render() {
    const { appName } = this.props;

    return (
      <div className="Home markdown-body">
        <h1>
          <FormattedMessage {...homeMessages.welcome} />
        </h1>
        <p>
          <FormattedMessage {...homeMessages.description} values={{ appName }} />
        </p>
        <h4>
          <FormattedMessage {...homeMessages.listIntro} />
        </h4>
        <List>
          <ListItem onTouchTap={this.linkSignup}>
            <FormattedMessage {...homeMessages.loginRegistration} />
          </ListItem>
          <ListItem onTouchTap={this.linkTodos}>
            <FormattedMessage {...homeMessages.todos} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default connect(state => ({
  appName: state.config.appName,
}), { push })(Home);

import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import start from '../universal/decorators/startDecorator';

const messages = defineMessages({
  title: {
    id: 'seo.title.index',
    defaultMessage: 'Index',
  },
  description: {
    id: 'seo.description.index',
    description: 'In EN, the "Teh" is intentional',
    defaultMessage: 'Teh best boilerplate',
  },
  user: {
    id: 'sidebar.user',
    defaultMessage: 'User',
  },
  todos: {
    id: 'sidebar.todos',
    defaultMessage: 'Todos',
  },
});

@start
@injectIntl
@connect(state => ({
  appName: state.config.appName,
}))
export default class Index extends Component {
  static propTypes = {
    children: PropTypes.node,
    appName: PropTypes.string,
    intl: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  @autobind
  handleToggleDrawer() {
    this.setState({
      open: !this.state.open, // TODO redux
    });
  }

  render() {
    const { intl, children, appName } = this.props;
    const { open } = this.state;

    return (
      <div id="app-view">
        <Helmet
          title={intl.formatMessage(messages.title)}
          titleTemplate={`%s | ${appName}`}
          meta={[
            { name: 'description', content: intl.formatMessage(messages.description) },
            { property: 'og:type', content: 'boilerplate' },
          ]}
        />
        <AppBar
          title={appName}
          onLeftIconButtonTouchTap={this.handleToggleDrawer}
        />
        <Drawer
          open={open}
          docked={false}
          onRequestChange={this.handleToggleDrawer}
        >
          <AppBar showMenuIconButton={false} />
          <MenuItem>
            <FormattedMessage {...messages.user} />
          </MenuItem>
          <MenuItem>
            <FormattedMessage {...messages.todos} />
          </MenuItem>
        </Drawer>
        {children}
      </div>
    );
  }
}


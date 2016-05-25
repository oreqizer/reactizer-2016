import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { autobind } from 'core-decorators';

import { SUCCESS } from '../../../universal/consts/phaseConsts';
import { toggleSidebar } from '../../../universal/redux/modules/ui/uiDuck';

const messages = defineMessages({
  profile: {
    id: 'sidebar.profile',
    defaultMessage: 'Profile',
  },
  signup: {
    id: 'sidebar.signup',
    defaultMessage: 'Sign up',
  },
  todos: {
    id: 'sidebar.todos',
    defaultMessage: 'Todos',
  },
});

@injectIntl
@connect(state => ({
  sidebar: state.ui.sidebar,
  appName: state.config.appName,
  user: state.user,
}))
export default class Sidebar extends Component {
  static propTypes = {
    intl: PropTypes.object,
    appName: PropTypes.string,
    user: PropTypes.object,
    sidebar: PropTypes.bool,
    children: PropTypes.node,
    dispatch: PropTypes.func,
  };

  @autobind
  handleToggleDrawer() {
    this.props.dispatch(toggleSidebar());
  }

  @autobind
  handleMenuClick(path) {
    this.handleToggleDrawer();
    this.props.dispatch(push(path));
  }

  @autobind
  renderMenuItems() {
    const { user } = this.props;

    switch (user.state) {
      case SUCCESS:
        return [
          <MenuItem
            key="profile"
            onTouchTap={() => this.handleMenuClick('/profile')}
          >
            <FormattedMessage {...messages.profile} />
          </MenuItem>,
          <MenuItem
            key="todos"
            onTouchTap={() => this.handleMenuClick('/todos')}
          >
            <FormattedMessage {...messages.todos} />
          </MenuItem>,
        ];

      default:
        return [
          <MenuItem
            key="signup"
            onTouchTap={() => this.handleMenuClick('/signup')}
          >
            <FormattedMessage {...messages.signup} />
          </MenuItem>,
        ];
    }
  }

  render() {
    const { sidebar } = this.props;

    return (
      <Drawer
        open={sidebar}
        docked={false}
        onRequestChange={this.handleToggleDrawer}
      >
        <AppBar showMenuIconButton={false} />

        {this.renderMenuItems()}
      </Drawer>
    );
  }
}


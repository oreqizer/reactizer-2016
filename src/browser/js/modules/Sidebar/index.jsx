import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { push } from 'react-router-redux';
import { AppBar, Drawer, MenuItem, Divider, DropDownMenu } from 'material-ui';
import { autobind } from 'core-decorators';
import { partial } from 'ramda';

import { SUCCESS } from '../../../../universal/consts/phaseConsts';
import { toggleSidebar } from '../../../../universal/modules/ui/uiDuck';
import { logoutUser } from '../../../../universal/modules/user/userDuck';
import { setLocale } from '../../../../universal/modules/intl/intlDuck';

import { sidebarMessages } from '../../../../universal/messages';

const actionCreators = {
  toggleSidebar,
  logoutUser,
  setLocale,
  push,
};

const styles = {
  localeMenu: {
    width: '100%',
    marginBottom: 50,
  },
};

@injectIntl
@connect(state => ({
  sidebar: state.ui.sidebar,
  appName: state.config.appName,
  locales: state.intl.locales,
  locale: state.intl.locale,
  user: state.user,
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
}))
export default class Sidebar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    appName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    sidebar: PropTypes.bool.isRequired,
    locales: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  };

  @autobind
  handleToggleDrawer() {
    this.props.actions.toggleSidebar();
  }

  @autobind
  handleMenuClick(path) {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.push(path);
  }

  @autobind
  handleLogout() {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.logoutUser();
    actions.push('/');
  }

  @autobind
  renderMenuItems(phase) {
    switch (phase) {
      case SUCCESS:
        return [
          <MenuItem
            key="profile"
            onTouchTap={partial(this.handleMenuClick, ['/profile'])}
          >
            <FormattedMessage {...sidebarMessages.profile} />
          </MenuItem>,
          <MenuItem
            key="todos"
            onTouchTap={partial(this.handleMenuClick, ['/todos'])}
          >
            <FormattedMessage {...sidebarMessages.todos} />
          </MenuItem>,
          <Divider key="divider" />,
          <MenuItem
            key="logout"
            onTouchTap={this.handleLogout}
          >
            <FormattedMessage {...sidebarMessages.logout} />
          </MenuItem>,
        ];

      default:
        return [
          <MenuItem
            key="signup"
            onTouchTap={partial(this.handleMenuClick, ['/signup'])}
          >
            <FormattedMessage {...sidebarMessages.signup} />
          </MenuItem>,
        ];
    }
  }

  render() {
    const { user, sidebar, locale, locales, actions } = this.props;

    return (
      <Drawer
        open={sidebar}
        docked={false}
        onRequestChange={this.handleToggleDrawer}
      >
        <AppBar showMenuIconButton={false} />

        <DropDownMenu
          value={locale}
          onChange={(ev, target, value) => actions.setLocale(value)}
          autoWidth={false}
          style={styles.localeMenu}
        >
          {locales.map(loc =>
            <MenuItem
              key={loc}
              value={loc}
              primaryText={loc.toUpperCase()}
            />
          )}
        </DropDownMenu>

        {this.renderMenuItems(user.phase)}
      </Drawer>
    );
  }
}

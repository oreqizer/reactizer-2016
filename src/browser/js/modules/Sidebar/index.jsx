import React, { PropTypes } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { push } from 'react-router-redux';
import { AppBar, Drawer, MenuItem, Divider, DropDownMenu } from 'material-ui';
import { partial } from 'ramda';

import { SUCCESS } from '../../../../universal/consts/phaseConsts';
import { toggleSidebar } from '../../../../universal/modules/ui/uiDuck';
import { logoutUser } from '../../../../universal/modules/user/userDuck';
import { setLocale } from '../../../../universal/modules/intl/intlDuck';

import { sidebarMessages } from '../../../../universal/messages';

const styles = {
  localeMenu: {
    width: '100%',
    marginBottom: 50,
  },
};

function handleToggleDrawer(actions) {
  actions.toggleSidebar();
}

function handleMenuClick(actions, path) {
  actions.toggleSidebar();
  actions.push(path);
}

function handleLogout(actions) {
  actions.toggleSidebar();
  actions.logoutUser();
  actions.push('/');
}

function renderMenuItems(props) {
  return props.user.phase === SUCCESS ? [
    <MenuItem
      key="profile"
      onTouchTap={partial(handleMenuClick, [props.actions, '/profile'])}
    >
      <FormattedMessage {...sidebarMessages.profile} />
    </MenuItem>,
    <MenuItem
      key="todos"
      onTouchTap={partial(handleMenuClick, [props.actions, '/todos'])}
    >
      <FormattedMessage {...sidebarMessages.todos} />
    </MenuItem>,
    <Divider key="divider" />,
    <MenuItem
      key="logout"
      onTouchTap={partial(handleLogout, [props.actions])}
    >
      <FormattedMessage {...sidebarMessages.logout} />
    </MenuItem>,
  ] : [
    <MenuItem
      key="signup"
      onTouchTap={partial(handleMenuClick, [props.actions, '/signup'])}
    >
      <FormattedMessage {...sidebarMessages.signup} />
    </MenuItem>,
  ];
}

const Sidebar = props =>
  <Drawer
    open={props.sidebar}
    docked={false}
    onRequestChange={partial(handleToggleDrawer, [props.actions])}
  >
    <AppBar showMenuIconButton={false} />

    <DropDownMenu
      value={props.locale}
      onChange={(ev, target, value) => props.actions.setLocale(value)}
      autoWidth={false}
      style={styles.localeMenu}
    >
      {props.locales.map(loc =>
        <MenuItem
          key={loc}
          value={loc}
          primaryText={loc.toUpperCase()}
        />
      )}
    </DropDownMenu>

    {renderMenuItems(props)}
  </Drawer>;

Sidebar.propTypes = {
  intl: intlShape.isRequired,
  sidebar: PropTypes.bool.isRequired,
  appName: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const actionCreators = {
  toggleSidebar,
  logoutUser,
  setLocale,
  push,
};

export default compose(
  injectIntl,
  connect(state => ({
    sidebar: state.ui.sidebar,
    appName: state.config.appName,
    locales: state.intl.locales,
    locale: state.intl.locale,
    user: state.user,
  }), dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  }))
)(Sidebar);

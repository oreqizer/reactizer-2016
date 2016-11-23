import React, { PropTypes, PureComponent } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { push } from 'react-router-redux';
import { AppBar, Drawer, MenuItem, Divider, DropDownMenu } from 'material-ui';

import { SUCCESS } from '../../../universal/consts/phaseConsts';
import { toggleSidebar } from '../../../universal/modules/ui/uiDuck';
import { logoutUser } from '../../../universal/modules/user/userDuck';
import { setLocale } from '../../../universal/modules/intl/intlDuck';

import { sidebarMessages } from '../../../universal/messages';


// TODO to stylus
const styles = {
  localeMenu: {
    width: '100%',
    marginBottom: 50,
  },
};

class Sidebar extends PureComponent {
  static propTypes = {
    sidebar: PropTypes.bool.isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    locale: PropTypes.string.isRequired,
    // connect
    user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickTodos = this.handleClickTodos.bind(this);
    this.handleClickSignup = this.handleClickSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  handleClickProfile() {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.push('/profile');
  }

  handleClickTodos() {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.push('/todos');
  }

  handleClickSignup() {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.push('/signup');
  }

  handleLogout() {
    const { actions } = this.props;

    actions.toggleSidebar();
    actions.logoutUser();
    actions.push('/');
  }

  handleChangeLocale(ev, target, value) {
    this.props.actions.setLocale(value);
  }

  handleToggleDrawer() {
    this.props.actions.toggleSidebar();
  }

  render() {
    const { sidebar, locale, locales, user } = this.props;

    const success = user.phase === SUCCESS;

    return (
      <Drawer
        open={sidebar}
        docked={false}
        onRequestChange={this.handleToggleDrawer}
      >
        <AppBar showMenuIconButton={false} />

        <DropDownMenu
          value={locale}
          onChange={this.handleChangeLocale}
          autoWidth={false}
          style={styles.localeMenu}
        >
          {locales.map(loc =>
            <MenuItem
              key={loc}
              value={loc}
              primaryText={loc.toUpperCase()}
            />,
          )}
        </DropDownMenu>

        {success &&
          <MenuItem onTouchTap={this.handleClickProfile}>
            <FormattedMessage {...sidebarMessages.profile} />
          </MenuItem>
        }
        {success &&
          <MenuItem onTouchTap={this.handleClickTodos}>
            <FormattedMessage {...sidebarMessages.todos} />
          </MenuItem>
        }
        {success && <Divider />}
        {success ?
          <MenuItem onTouchTap={this.handleLogout}>
            <FormattedMessage {...sidebarMessages.logout} />
          </MenuItem> :
          <MenuItem onTouchTap={this.handleClickSignup}>
            <FormattedMessage {...sidebarMessages.signup} />
          </MenuItem>
        }
      </Drawer>
    );
  }
}

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
  })),
)(Sidebar);

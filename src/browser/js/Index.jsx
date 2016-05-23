import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import start from '../../universal/decorators/startDecorator';

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
          onLeftIconButtonTouchTap={this.handleToggleDrawer}
        />
        <Drawer open={open}>
          <AppBar
            title={appName}
            onTitleTouchTap={this.handleToggleDrawer}
          />
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        {children}
      </div>
    );
  }
}


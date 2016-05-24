import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import start from '../universal/decorators/startDecorator';
import { toggleSidebar } from '../universal/redux/modules/ui/uiDuck';

import Sidebar from './modules/Sidebar';

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
    intl: PropTypes.object,
    appName: PropTypes.string,
    user: PropTypes.object,
    children: PropTypes.node,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  @autobind
  handleToggleDrawer() {
    this.props.dispatch(toggleSidebar());
  }

  render() {
    const { intl, children, appName } = this.props;

    return (
      <div id="Index">
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
        <Sidebar />
        {children}
      </div>
    );
  }
}

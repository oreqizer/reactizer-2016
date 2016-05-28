import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { defineMessages, injectIntl } from 'react-intl';
import { AppBar, FontIcon } from 'material-ui';
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

  renderGithub() {
    return (
      <Link to="https://github.com/oreqizer/reactizer">
        <FontIcon className="octocat" style={{ margin: 12 }} />
      </Link>
    );
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
          iconElementRight={this.renderGithub()}
          onLeftIconButtonTouchTap={this.handleToggleDrawer}
        />
        <Sidebar />
        <div id="container">
          {children}
        </div>
      </div>
    );
  }
}

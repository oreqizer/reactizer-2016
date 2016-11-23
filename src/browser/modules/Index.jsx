import React, { PropTypes, Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl, intlShape } from 'react-intl';
import { AppBar, FontIcon } from 'material-ui';
import Helmet from 'react-helmet';

import intlProvider from '../../universal/decorators/intlProvider';
import * as actions from '../../universal/modules/ui/uiDuck';
import { indexMessages } from '../../universal/messages';

import Sidebar from './Sidebar/Sidebar';


const pointerStyle = { cursor: 'pointer' };

const octocatStyle = { margin: 12 };

class Index extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    appName: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.meta = [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: props.intl.formatMessage(indexMessages.description) },
      { property: 'og:type', content: 'boilerplate' },
    ];

    this.octocat = (
      <a href="https://github.com/oreqizer/reactizer" target="_blank" rel="noopener noreferrer">
        <FontIcon className="octocat" style={octocatStyle} />
      </a>
    );

    this.title = (
      <span style={pointerStyle}>{props.appName}</span>
    );

    this.linkHome = this.linkHome.bind(this);
  }

  linkHome() {
    this.props.push('/');
  }

  render() {
    const { intl, appName, toggleSidebar, children } = this.props;

    return (
      <div id="Index">
        <Helmet
          title={intl.formatMessage(indexMessages.title)}
          titleTemplate={`%s | ${appName}`}
          meta={this.meta}
        />
        <AppBar
          title={this.title}
          iconElementRight={this.octocat}
          onTitleTouchTap={this.linkHome}
          onLeftIconButtonTouchTap={toggleSidebar}
        />
        <Sidebar />
        <div id="container">
          {children}
        </div>
      </div>
    );
  }
}

export default compose(
  intlProvider,
  injectIntl,
  connect(state => ({
    appName: state.config.appName,
  }), { push, toggleSidebar: actions.toggleSidebar }),
)(Index);

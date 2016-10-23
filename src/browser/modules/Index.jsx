import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl, intlShape } from 'react-intl';
import { AppBar, FontIcon } from 'material-ui';
import Helmet from 'react-helmet';

import intlProvider from '../../universal/decorators/intlProvider';
import { toggleSidebar } from '../../universal/modules/ui/uiDuck';
import { indexMessages } from '../../universal/messages';

import Sidebar from './Sidebar/Sidebar';


const Index = props =>
  <div id="Index">
    <Helmet
      title={props.intl.formatMessage(indexMessages.title)}
      titleTemplate={`%s | ${props.appName}`}
      meta={[
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: props.intl.formatMessage(indexMessages.description) },
        { property: 'og:type', content: 'boilerplate' },
      ]}
    />
    <AppBar
      title={<span style={{ cursor: 'pointer' }}>{props.appName}</span>}
      iconElementRight={
        <a href="https://github.com/oreqizer/reactizer" target="_blank" rel="noopener noreferrer">
          <FontIcon className="octocat" style={{ margin: 12 }} />
        </a>
      }
      onTitleTouchTap={() => props.push('/')}
      onLeftIconButtonTouchTap={props.toggleSidebar}
    />
    <Sidebar />
    <div id="container">
      {props.children}
    </div>
  </div>;

Index.propTypes = {
  intl: intlShape.isRequired,
  appName: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default compose(
  intlProvider,
  injectIntl,
  connect(state => ({
    appName: state.config.appName,
  }), { push, toggleSidebar })
)(Index);

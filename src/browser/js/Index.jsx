import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

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
  todos: {
    id: 'index.todos',
    defaultMessage: 'Todos',
  },
});

const Index = props =>
  <div id="app-view">
    <Helmet
      title={props.intl.formatMessage(messages.title)}
      titleTemplate={`%s | ${props.appName}`}
      meta={[
          { name: 'description', content: props.intl.formatMessage(messages.description) },
          { property: 'og:type', content: 'boilerplate' },
      ]}
    />
    <h1>
      <FormattedMessage {...messages.todos} />
    </h1>
    <hr />
    {props.children}
  </div>;

Index.propTypes = {
  children: PropTypes.node,
  appName: PropTypes.string,
  intl: PropTypes.object,
};

const connected = connect(state => ({
  appName: state.config.appName,
}))(Index);

const intled = injectIntl(connected);

export default start(intled);

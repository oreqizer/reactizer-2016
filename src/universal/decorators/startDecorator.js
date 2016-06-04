import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

export default function (Wrapped) {
  const Start = props =>
    <IntlProvider
      key={props.intl.locale} // makes changing locale in Redux work
      defaultLocale={props.intl.defaultLocale}
      initialNow={props.intl.initialNow}
      locale={props.intl.locale}
      messages={props.intl.messages[props.intl.locale]}
    >
      <Wrapped {...props} />
    </IntlProvider>;

  Start.propTypes = {
    intl: PropTypes.object.isRequired,
  };

  return connect(state => ({
    intl: state.intl,
  }))(Start);
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { profileMessages } from '../../../universal/messages';

const Profile = ({ username, email }) =>
  <div className="Profile markdown-body">
    <h2>
      <FormattedMessage {...profileMessages.heading} />
    </h2>
    <p>
      <FormattedMessage {...profileMessages.username} values={{ username }} />
    </p>
    <p>
      <FormattedMessage {...profileMessages.email} values={{ email }} />
    </p>
  </div>;

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(state => ({
  username: state.user.user.username,
  email: state.user.user.email,
}))(Profile);

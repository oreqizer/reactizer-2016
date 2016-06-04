import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  heading: {
    id: 'profile.heading',
    defaultMessage: 'Profile',
  },
  username: {
    id: 'profile.username',
    defaultMessage: 'Username: {username}',
  },
  email: {
    id: 'profile.email',
    defaultMessage: 'Email: {email}',
  },
});

const Profile = ({ username, email }) =>
  <div className="Profile markdown-body">
    <h2>
      <FormattedMessage {...messages.heading} />
    </h2>
    <p>
      <FormattedMessage {...messages.username} values={{ username }} />
    </p>
    <p>
      <FormattedMessage {...messages.email} values={{ email }} />
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

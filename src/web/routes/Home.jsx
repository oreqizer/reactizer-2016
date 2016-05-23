import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  text: {
    id: 'about.text',
    defaultMessage: 'Some arbitary text',
  },
  home: {
    id: 'about.todos',
    defaultMessage: 'Todos',
  },
});

const Home = () =>
  <div className="About">
    <p className="about-text">
      <FormattedMessage {...messages.text} />
    </p>
    <Link to="/">
      <FormattedMessage {...messages.home} />
    </Link>
  </div>;

export default Home;

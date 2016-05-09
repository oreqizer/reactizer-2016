import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  text: {
    id: 'about.text',
    defaultMessage: 'Some arbitary text',
  },
  home: {
    id: 'about.home',
    defaultMessage: 'Home',
  },
});

const About = () =>
  <div className="about">
    <div className="about-bg"></div>
    <img src="/images/about.png" alt="about" className="about-img" />
    <p className="about-text">
      <FormattedMessage {...messages.text} />
    </p>
    <Link to="/">
      <FormattedMessage {...messages.home} />
    </Link>
  </div>;

export default About;

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const About = props =>
  <div className="about">
    <div className="about-bg"></div>
    <img src="/images/about.png" alt="about" className="about-img" />
    <p className="about-text">Some arbitary text</p>
    <Link to="/">Home</Link>
  </div>;

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(About);

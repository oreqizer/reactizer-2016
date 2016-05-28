import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.user,
}))
export default class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        
      </div>
    )
  }
}

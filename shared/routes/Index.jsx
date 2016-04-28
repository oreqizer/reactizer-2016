import React, { PropTypes } from 'react';

const Index = props =>
  <div id="app-view">
    <h1>Todos</h1>
    <hr />
    {props.children}
  </div>;

Index.propTypes = {
  children: PropTypes.node
};

export default Index;


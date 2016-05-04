import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Index = props =>
  <div id="app-view">
    <Helmet
      title="reactizer"
      titleTemplate="%s | reactizer"
      meta={[
          { name: 'description', content: 'Teh best boilerplate' },
          { property: 'og:type', content: 'boilerplate' },
      ]}
    />
    <h1>Todos</h1>
    <hr />
    {props.children}
  </div>;

Index.propTypes = {
  children: PropTypes.node,
};

export default Index;

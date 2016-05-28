import React, { PropTypes } from 'react';

const Html = props =>
  <html {...props.head.htmlAttributes.toComponent()}>
    <head>
      {props.head.title.toComponent()}
      {props.head.base.toComponent()}
      {props.head.meta.toComponent()}
      {props.head.link.toComponent()}
      {props.head.script.toComponent()}
      <link href={props.assets.main.css} rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </head>
    <body data-redux-state={props.state}>
      <div
        id="react-view"
        dangerouslySetInnerHTML={{ __html: props.app }}
      />
      <script src={props.assets.main.js} />
    </body>
  </html>;

Html.propTypes = {
  head: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  app: PropTypes.string.isRequired,
};

export default Html;

import React, { PropTypes } from 'react';

export default class Response extends React.Component {
  render() {
    return (
      <div>
        <h1>Response</h1>
        {this.props.questions.map(this._renderResponse)}
      </div>
    );
  }

  _renderResponse = (question, index) => {
    return null;
  }
}

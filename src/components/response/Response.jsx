import React, { PropTypes } from 'react';
import getQuestion from '../../questions';

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
    let props = {
      key: question.question,
      number: index + 1,
      question,
      response: this.props.responses[index]
    };
    let meta = getQuestion(question);
    return React.createElement(meta.Response, props);
  }
}

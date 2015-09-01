import React, { PropTypes } from 'react';

export class Response extends React.Component {
  static propTypes = {
    // TODO share with editor component
  }

  render() {
    return (
      <div>
        <p>Q{this.props.number}. {this.props.question.question}?{this.props.question.isRequired ? ' *' : null}</p>
        <p>{this.props.response}</p>
      </div>
    );
  }
}

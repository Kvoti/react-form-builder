import React, { PropTypes } from 'react';

export class Response extends React.Component {
  static propTypes = {
    // TODO share with submit component
  }

  static displayName = 'ChoiceResponse'
  
  render() {
    return (
      <div>
        <p>Q{this.props.number}. {this.props.question.question}{this.props.isRequired ? ' *' : null}</p>
        <ul>
          {this.props.question.choice.options.map(option => {
            return (
              <li>
              {option}
              {this._isChecked(option) ? ' \u2713' : null}
              </li>
            )}
           )}
        </ul>
        {this.props.response.otherText ? <p><strong>Other:</strong> {this.props.response.otherText}</p> : null}
      </div>
    );
  }

  _isChecked(option) {
    if (!this.props.isMultiple) {
      return this.props.response.choice === option;
    }
    return this.props.response.choice.indexOf(option) !== -1;
  }
}

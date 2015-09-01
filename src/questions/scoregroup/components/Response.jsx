import React, { PropTypes } from 'react';

export class Response extends React.Component {

  static propTypes = {
    // TODO
  }

  static displayName = 'ScoreGroupResponse'
  
  render() {
    console.log(this.props.response);
    return (
      <table className="table table-striped" style={{width: 'auto'}}>
        <caption>
          {this.props.question.question}{this.props.isRequired ? ' *' : ''}
        </caption>
        <thead>
          <tr>
            <th></th>
            {this.props.question.scoregroup.labels.map((label, i) => {
              return (
                <th key={i}>{label.label}</th>
              );
             })}
          </tr>
        </thead>
        <tbody>
          {this.props.question.scoregroup.items.map((item, i) => {
            return (
              <tr>
              <td>
              {item.text}
              </td>
              {this.props.question.scoregroup.labels.map((label, j) => {
                return (
                  <td>
                  {this.props.response[i] === label.label ? ' \u2713' : null}
                  </td>
                );
              })}
              </tr>
            );
           })}
        </tbody>
      </table>
    );
  }
}

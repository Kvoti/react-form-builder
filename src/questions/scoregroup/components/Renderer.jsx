import React, { PropTypes } from 'react';

import ControlErrors from '../../../components/editors/renderer/ControlErrors';
import { controlRowErrorClassNames } from '../../../components/editors/renderer/utils';
import ControlValidationIcon from '../../../components/editors/renderer/ControlValidationIcon';

export class Renderer extends React.Component {
  static displayName = 'ScoreGroupRenderer'
  
  render() {
    let question = this.props.question;
    let answer = this.props.value;
    return (
      <div
              className={controlRowErrorClassNames(answer.errors, {'form-group': true})}
      >
      
      <table className="table table-striped" style={{width: 'auto'}}>
        <caption>
          {question.question.get()}{question.isRequired.get() ? '*' : ''}
        </caption>
        <thead>
          <tr>
            <th></th>
            {question.scoregroup.labels.get() && question.scoregroup.labels.get().map((label, i) => {
              return (
                <th key={label.label}>{label.label}</th>
              );
             })}
          </tr>
        </thead>
        <tbody>
          {question.scoregroup.items.get() && question.scoregroup.items.get().map((item, i) => {
            return (
              <tr key={item.text}>
              <td>
              {item.text}
              </td>
              {question.scoregroup.labels.get() && question.scoregroup.labels.get().map(label => {
                return (
                  <td key={label.label}>
                  <input
                  name={item.text}
                  type="radio"
                  onChange={() => answer.setChoice(i, label.label)}
                  checked={answer.get()[i] === label.label}
                  />
                  </td>
                );
              })}
              </tr>
            );
           })}
        </tbody>
      </table>
      <ControlValidationIcon controlID="TODO" errors={answer.errors} />
      <ControlErrors errors={answer.errors}/>
      </div>
    );
  }
}

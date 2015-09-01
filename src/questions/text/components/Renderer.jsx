import React, { PropTypes } from 'react';
import getID from '../../../getID'; // TODO move to a separate utils lib
import DelayedInput from '../../../components/DelayedInput';

import ControlErrors from '../../../components/editors/renderer/ControlErrors';
import ControlValidationIcon from '../../../components/editors/renderer/ControlValidationIcon';
import { controlRowErrorClassNames } from '../../../components/editors/renderer/utils';

export class Renderer extends React.Component {
  static displayName = 'TextRenderer'

  constructor(props) {
    super(props);
    this.ID = getID();
  }

  render() {
    let question = this.props.question;
    let answer = this.props.value;
    let control = React.DOM.input;
    if (question.text.isMultiline.get()) {
      control = React.DOM.textarea;
    }
    control = control(
      {
        id: this.ID,
        className: 'form-control',
        value: answer.get()
      }
    );
    // TODO use ControlRow here? Same markup, just need ControlRow to be able to wrap a control
    return (
      <div
              className={controlRowErrorClassNames(answer.errors, {'form-group': true})}
              >
        <label
                htmlFor={this.ID}
                className='control-label'
                >
          {question.question.get()}?{question.isRequired.get() ? ' *' : ' '}
        </label>
        <div style={{position: 'relative'}}>
          <DelayedInput
                  immediate={answer.isBound}
                  onChange={(v) => answer.set(v)}
                  onPendingChange={(v) => answer.pend().set(v)}
                  >
            {control}
          </DelayedInput>
          <ControlValidationIcon controlID={this.ID} errors={answer.errors} />
        </div>
        <ControlErrors errors={answer.errors} />
      </div>
    );
  }
}

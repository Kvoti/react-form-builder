import React from 'react';

import * as schema from 'data-schema/src/schema';
import getQuestion from '../../questions';

// TODO replace with superagent
import { post } from '../../request';
//////////////////////////////////////////////////
import Response from '../response/Response';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    let formSchema = this._getSchema(this.props.form);
    this.state = {
      form: formSchema,
      isResponding: true
    };
  }

  render() {
    if (!this.state.isResponding) {
      return (
        <div>
          <button
                  className="btn btn-default"
                  onClick={this._closeResponse}
                  >
            Back
          </button>
          <Response
                  questions={this.props.form.managed.questions.get()}
                  responses={this.state.form.get()}
          />
        </div>
      );
    }
                
    let formSpec = this.props.form;
    let questionRows = formSpec.managed.questions.members.map(([j, q], i) => {
      return (
        <div
                key={i}
                className="well"
                >
          {this._renderQuestion(q, i)}
        </div>
      );
    });
    return (
          <form onSubmit={this._save}>
            {questionRows}
            <input type="submit" className="btn btn-success" value="Submit"/>
          </form>
    );
  }

  _renderQuestion(question, index) {
    let props = {
      question,
//      key: index,
      ref: index,
      value: this.state.form.managed[index]
    };
    console.log(props);
    let meta = getQuestion(question);
    return React.createElement(meta.Renderer, props);
  }

  _getSchema(form) {
    let values = new schema.ManagedObject(
      schema.array()  // TODO shema.tuple or schema.struct better?
    );
    form.managed.questions.members.forEach(([j, q], i) => {
      let question = getQuestion(q);
      values.managed.add(
        // TODO shouldn't need initial values here
        question.getEmptyAnswer(q.get()),
        question.getAnswerSchema(q.get())
      );
    });
    // TODO these are hacks until I sort out initial values vs data, URGH!
    values._isBound = {};
    values._validate();
    values._onChange = () => this.forceUpdate();
    //////////////////////////////////////////////////////////////////////
    console.log('schema', values);
    return values;
  }

  _save = (e) => {
    e.preventDefault();
    this.state.form.validateWithUnbound();
    //    this.forceUpdate();
    let isValid = this.state.form.isValid();
    if (isValid) {
      post(
        `/di/api/formbuilder/${this.props.form.managed.slug.get()}/responses/`,
        this.state.form.get()
      );
      this.setState({isResponding: false});
    } else {
      this.forceUpdate();
    }
  }

  _closeResponse = () => {
    this.setState({isResponding: true});
  }
}

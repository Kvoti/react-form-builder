import React from 'react';
import Sortable from 'react-components/Sortable';

import Editor from './editors/Editor';
import FormViewer from './viewers/Form';

export default class Form extends React.Component {
  state = {
    isEditing: false
  };

  render() {
    let isEditing = this.state.isEditing;
    if (!isEditing) {
      return (
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {this._renderEditButton()}
            <h1>{this.props.form.managed.title.get()}</h1>
            <FormViewer form={this.props.form} />
          </div>
        </div>
      );
    }
    let formSpec = this.props.form;
    let questionRows = formSpec.managed.questions.members.map(([j, q], i) => {
      return (
        <div
                key={i}
                draggable={isEditing}
                orderingIndex={i}
                className="row"
                >
          <div className="well">
            {this._renderQuestion(q, i, isEditing, this.props.isChanged, this.props.isValid)}
            {this._renderRemoveButton(q)}
          </div>
        </div>
     );
    });
    if (isEditing) {
      questionRows = (
        <Sortable
                components={questionRows}
                onReorder={this.props.onReorder}
        />
      );
    }
    let form = (
      <div>
         {questionRows}
         <select
                 className="form-control"
                 onChange={this._add}
                 >
           <option value="">-- Select new question --</option>
           <option value="text">Text</option>
           <option value="choice">Choice</option>
           <option value="scoregroup">Score group</option>
         </select>
      </div>
    );
    if (isEditing) {
      form = React.createElement(
        Editor,
        {
          editor: form,
          isValid: this.props.isValid,
          isChanged: this.props.isChanged,
          onSave: this._save,
          onCancel: this._cancelEdit,
        }
      );
    }
    return (
      <div>
        <h1>{formSpec.managed.title.get()}</h1>
        {form}
      </div>
    );
  }
  
  _renderQuestion(question) {
    return React.createElement(this._getEditComponent(question), { question });
  }
  
  _renderEditButton() {
    if (!this.state.isEditing) {
      return (
        <button
                className="btn btn-default"
                onClick={this._edit}
                >
          Edit
        </button>
      );
    }
    return null;
  }

  _renderRemoveButton(question) {
    if (this.state.isEditing) {
      return (
        <button
                className="btn btn-danger"
                onClick={question.remove}
                >
          Remove
        </button>
      );
    }
    return null;
  }

  _add = (e) => {
    this.props.onAddQuestion(e);
  }

  _edit = (index) => {
    this.setState({isEditing: true});
  }

  _save = () => {
    this.props.onSave();
  }

  _cancelEdit = () => {
    this.setState({isEditing: false});
    this.props.onCancelEdit();
  }
}

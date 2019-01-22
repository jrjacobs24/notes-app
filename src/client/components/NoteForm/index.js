import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import * as noteDialogActions from 'actions/noteDialogActions';
import { getActiveID } from 'reducers/activeIDReducer';
import { getNote } from 'reducers/notesReducer';
import { TextField } from '@material-ui/core';

class NoteForm extends React.Component {
  static defaultProps = {
    id: '',
    title: '',
    content: '',
  };

  static propTypes = {
    id: T.string,
    title: T.string,
    content: T.string,
    formID: T.string.isRequired,
    onSubmit: T.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      content: this.props.content,
      errors: {},
    };

    this.formData = [
      {
        name: 'title',
        validation: {
          isValid: value => value.length !== 0,
          message: 'Best to use a title...'
        }
      },
      {
        name: 'content',
        validation: {
          isValid: value => value.length !== 0,
          message: 'You forgot a note :('
        }
      }
    ];
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateForm(this.state);

    if (!isEmpty(errors)) {
      this.setState({
        errors
      });
      return;
    }

    this.props.onSubmit({ id: this.props.id, ...this.state });
  }

  /**
   * Iterate through our form fields, testing their values against their respective validators,
   * and return an Obj of `name: message` pairs for any fields that failed validation.
   */
  validateForm = () => this.formData
    .map(({ name, validation: { isValid, message } }) => (
      !isValid(this.state[name]) && ({ name, message })
    ))
    .filter(e => !!e)
    .reduce((acc, curr) => {
      acc[curr.name] = curr.message;
      return acc;
    }, {});

  render() {
    return (
      <form id={this.props.formID} onSubmit={this.handleSubmit}>
        <TextField
          value={this.state.title}
          onChange={this.handleChange}
          id="note-title"
          name="title"
          label="Title"
          placeholder="Add a title"
          margin="dense"
          error={!!this.state.errors['title']}
          helperText={this.state.errors['title']}
        />
        <TextField
          value={this.state.content}
          onChange={this.handleChange}
          id="note-content"
          name="content"
          label="Content"
          placeholder="Take a note..."
          margin="dense"
          error={!!this.state.errors['content']}
          helperText={this.state.errors['content']}
          multiline
          fullWidth
          autoFocus
        />
      </form>
    );
  }
}

export default connect(
  state => {
    const activeID = getActiveID(state);

    if (activeID) {
      return {
        ...getNote(state, activeID),
      };
    }

    return {};
  },
  {
    onSubmit: noteDialogActions.clickSubmitNoteButton,
  }
)(NoteForm);

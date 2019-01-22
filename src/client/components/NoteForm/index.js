import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
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
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

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
        />
        <TextField
          value={this.state.content}
          onChange={this.handleChange}
          id="note-content"
          name="content"
          label="Content"
          placeholder="Take a note..."
          margin="dense"
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

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import NoteCard from 'components/NoteCard';

const NotesList = ({ notes = [] }) => (
  <Grid container spacing={32}>
    {notes.map(note => (
      <NoteCard key={note.id} note={note} />
    ))}
  </Grid>
);

NotesList.defaultProps = { notes: [] };

NotesList.propTypes = {
  notes: T.arrayOf(T.shape({
    id: T.string.isRequired,
    title: T.string.isRequired,
    content: T.string.isRequired,
  }))
};

export default connect(
  state => ({ notes: state.notes }),
  null
)(NotesList);

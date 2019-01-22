import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import * as noteCardActions from 'actions/noteCardActions';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';
import { Edit as EditIcon, Close as DeleteIcon } from '@material-ui/icons';

const StyledHeader = styled(CardHeader)`
  padding: 0 0 16px;
`;

const CardWrapper = styled(Card)`
  max-width: 320px;
`;

const NoteCard = ({ note: { id, title, content }, onDeleteClick, onEditClick }) => (
  <Grid item>
    <CardWrapper>
      <CardContent>
        <StyledHeader title={title} />
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onDeleteClick(id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => onEditClick(id)}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </CardWrapper>
  </Grid>
);

NoteCard.propTypes = {
  note: T.shape({
    id: T.string.isRequired,
    title: T.string.isRequired,
    content: T.string.isRequired,
  }).isRequired,
  onDeleteClick: T.func.isRequired,
  onEditClick: T.func.isRequired,
};

export default connect(
  null,
  {
    onDeleteClick: noteCardActions.clickDeleteNoteButton,
    onEditClick: noteCardActions.clickEditNoteButton,
  }
)(NoteCard);

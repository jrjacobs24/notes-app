import { createAction } from 'redux-act';

const noteCardAction = (title, ...args) => createAction(`Note Card > ${title}`, ...args);

export const clickEditNoteButton = noteCardAction('Click Edit Note button', id => id);

export const clickDeleteNoteButton = noteCardAction('Click Delete Note button', id => id);

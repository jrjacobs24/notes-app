import { createAction } from 'redux-act';

export const setActiveID = createAction('Set `activeID` from URL path', id => id);
export const openNewNoteDialog = createAction('Open the New Note dialog');

const noteDialogAction = (title, ...args) => createAction(`Note Dialog > ${title}`, ...args);

// TODO illustrate `noteObj` shape via payloadReducer
export const clickSubmitNoteButton = noteDialogAction('Click Submit Note button', noteObj => noteObj);
export const clickCancelButton = noteDialogAction('Click Cancel button');

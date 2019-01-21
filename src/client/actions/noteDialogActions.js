import { createAction } from 'redux-act';

const noteDialogAction = (title, ...args) => createAction(`Note Dialog > ${title}`, ...args);

// TODO illustrate `noteObj` shape via payloadReducer
export const clickSubmitNoteButton = noteDialogAction('Click Submit Note button', noteObj => noteObj);
export const clickCancelButton = noteDialogAction('Click Cancel button');

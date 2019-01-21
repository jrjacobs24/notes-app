import { createAction } from 'redux-act';

const noteDialogAction = (title, ...args) => createAction(`Note Dialog > ${title}`, ...args);

export const clickCancelButton = noteDialogAction('Click Cancel button');

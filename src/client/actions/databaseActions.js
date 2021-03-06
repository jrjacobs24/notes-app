import { createAction } from 'redux-act';

const dbAction = (title, ...args) => createAction(`Database > ${title}`, ...args);

/**
 * Database Responses
 */
export const receiveNotesFromDB = dbAction('Received notes from DB');
export const addNoteFromDB = dbAction('Note added from DB');
export const updateNoteFromDB = dbAction('Note updated in DB');

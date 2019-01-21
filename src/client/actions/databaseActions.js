import { createAction } from 'redux-act';

const dbAction = (title, ...args) => createAction(`Database > ${title}`, ...args);

/**
 * Database Responses
 */
export const receiveNotesFromDB = dbAction('Received notes from DB');

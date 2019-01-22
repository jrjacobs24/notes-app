import { createAction } from 'redux-act';

export const showAlert = createAction('Show Alert Dialog', msg => msg);
export const hideAlert = createAction('Hide Alert Dialog');

/**
 * Specifically prefix these action types to designate where they occur
 */
const alertAction = (title, ...args) => createAction(`Alert Dialog > ${title}`, ...args);

export const clickCloseButton = alertAction('Click the Close button');
export const clickNewNoteButton = alertAction('Click the New Note button');

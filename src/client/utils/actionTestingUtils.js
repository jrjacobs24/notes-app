export function getPayload(localStore, actionName) {
  return getAction(localStore, actionName).payload;
}

export function getAction(localStore, actionName) {
  return localStore.getActions().find(action => action.type === actionName.getType());
}

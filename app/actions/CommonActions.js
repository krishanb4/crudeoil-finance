import * as types from '../constants/actionConstants';

export const serverInvokingStartedAction = items => ({
  type: types.SERVER_INVOKING_STARTED,
  items,
});

export const serverInvokingStoppedAction = items => ({
    type: types.SERVER_INVOKING_STOPPED,
    items,
  });
  

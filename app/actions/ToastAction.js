import * as types from '../constants/actionConstants';

export const closeToastAction = items => ({
  type: types.CLOSE_TOAST,
  items,
});

export const openToastAction = items => ({
    type: types.OPEN_TOAST,
    items,
  });
  

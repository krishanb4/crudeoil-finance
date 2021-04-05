import * as types from '../constants/actionConstants';

const openAction = (keyID, child, branch) => ({
  branch,
  type: `${branch}/${types.TOGGLE_TREE}`,
  keyID,
  child
});

export default openAction;

import * as types from '../constants/actionConstants';

export const fetchAction = items => ({
  type: types.FETCH_TIMELINE_DATA,
  items,
});

export const postAction = (text, media, privacy) => ({
  type: types.POST,
  text,
  media,
  privacy
});

export const toggleLikeAction = item => ({
  type: types.TOGGLE_LIKE,
  item,
});

export const fetchCommentAction = item => ({
  type: types.FETCH_COMMENT_DATA,
  item,
});

export const postCommentAction = (comment) => ({
  type: types.POST_COMMENT,
  comment,
});

export const closeNotifAction = {
  type: types.CLOSE_NOTIF
};

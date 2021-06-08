import actions from './action-types';

export const likeBlog = (dispatch, value) => {
  dispatch({
    type: actions.LIKE_BLOG,
    payload: {
      value,
    },
  });
};

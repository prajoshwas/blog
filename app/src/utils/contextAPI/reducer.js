import actions from './action-types';

export default (state = null, action) => {
  switch (action.type) {
    case actions.LIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog,
        ),
      };
    case actions.DISLIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog,
        ),
      };
    case actions.SAVE_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
  }
  return state;
};

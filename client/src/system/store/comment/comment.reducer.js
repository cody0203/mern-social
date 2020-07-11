import * as types from "./comment.types";

const INITIAL_STATE = {
  createCommentLoading: false,
  likeCommentLoading: false,
  error: null,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_COMMENT.START:
      return {
        ...state,
        createCommentLoading: true,
      };

    case types.CREATE_COMMENT.SUCCESS:
      return {
        ...state,
        createCommentLoading: false,
      };

    case types.CREATE_COMMENT.FAILURE:
      return {
        ...state,
        createCommentLoading: false,
        error: action.payload,
      };

    case types.LIKE_COMMENT.START:
      return {
        ...state,
        likeCommentLoading: true,
      };

    case types.LIKE_COMMENT.SUCCESS:
      return {
        ...state,
        likeCommentLoading: false,
      };

    case types.LIKE_COMMENT.FAILURE:
      return {
        ...state,
        likeCommentLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;

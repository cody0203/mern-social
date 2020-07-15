import * as types from './comment.types';

const INITIAL_STATE = {
  createCommentLoading: false,
  likeCommentLoading: false,
  deleteCommentLoading: false,
  createReplyLoading: false,
  deleteReplyLoading: false,
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

    case types.CREATE_REPLY.START:
      return {
        ...state,
        createReplyLoading: true,
      };

    case types.CREATE_REPLY.SUCCESS:
      return {
        ...state,
        createReplyLoading: false,
      };

    case types.CREATE_REPLY.FAILURE:
      return {
        ...state,
        createReplyLoading: false,
        error: action.payload,
      };

    case types.DELETE_COMMENT.START:
      return {
        ...state,
        deleteCommentLoading: true,
      };

    case types.DELETE_COMMENT.SUCCESS:
      return {
        ...state,
        deleteCommentLoading: false,
      };

    case types.DELETE_COMMENT.START:
      return {
        ...state,
        deleteCommentLoading: false,
        error: action.payload,
      };

    case types.DELETE_REPLY.START:
      return {
        ...state,
        deleteReplyLoading: true,
      };

    case types.DELETE_REPLY.SUCCESS:
      return {
        ...state,
        deleteReplyLoading: false,
      };

    case types.DELETE_REPLY.FAILURE:
      return {
        ...state,
        deleteReplyLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;

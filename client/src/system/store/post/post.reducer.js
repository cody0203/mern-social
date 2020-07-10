import { get } from 'lodash';
import * as types from './post.types';
import * as utils from './post.utils';

const INITIAL_STATE = {
  postList: {
    postListData: [],
    postListMeta: null,
    postListLoading: true,
  },
  userPost: {
    userPostData: [],
    userPostMeta: null,
    userPostLoading: true,
  },
  createPostLoading: false,
  updatePostLoading: false,
  deletePost: {
    deletePostData: {},
    deletePostLoading: false,
  },
  createComment: {
    createCommentLoading: false,
    createCommentData: {},
  },
  error: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_POST_LIST.START:
      return {
        ...state,
        postList: {
          postListData: [],
          postListMeta: null,
          postListLoading: true,
        },
      };

    case types.FETCH_POST_LIST.SUCCESS:
      const postListData = get(action, 'payload.data');
      const postListMeta = get(action, 'payload.meta');
      return {
        ...state,
        postList: {
          postListData,
          postListMeta,
          postListLoading: false,
        },
      };

    case types.FETCH_POST_LIST.START:
      return {
        ...state,
        postList: {
          postListData: [],
          postListMeta: null,
          postListLoading: false,
        },
        error: action.payload,
      };

    case types.CREATE_POST.START:
      return {
        ...state,
        createPostLoading: true,
      };

    case types.CREATE_POST.SUCCESS:
      const afterCreatedPostList = [...state.postList.postListData];
      afterCreatedPostList.unshift(action.payload);

      return {
        ...state,
        createPostLoading: false,
        postList: {
          ...state.postList,
          postListData: afterCreatedPostList,
        },
      };

    case types.CREATE_POST.FAILURE:
      return {
        ...state,
        createPostLoading: false,
        error: action.payload,
      };

    case types.UPDATE_POST.START:
      return {
        ...state,
        updatePostLoading: true,
      };

    case types.UPDATE_POST.SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          postListData: utils.updatePostList(state.postList.postListData, action.payload),
        },
        updatePostLoading: false,
      };

    case types.UPDATE_POST.FAILURE:
      return {
        ...state,
        updatePostLoading: false,
        error: action.payload,
      };

    case types.DELETE_POST.START:
      return {
        ...state,
        deletePost: {
          deletePostData: {},
          deletePostLoading: true,
        },
      };

    case types.DELETE_POST.SUCCESS:
      return {
        ...state,
        deletePost: {
          deletePostData: action.payload,
          deletePostLoading: false,
        },
      };

    case types.DELETE_POST.FAILURE:
      return {
        ...state,
        deletePost: {
          deletePostData: {},
          deletePostLoading: false,
        },
        error: action.payload,
      };

    case types.LIKE_POST.SUCCESS:
      return {
        ...state,
        postList: {
          ...state.postList,
          postListData: utils.updatePostList(state.postList.postListData, action.payload),
        },
      };

    case types.LIKE_POST.FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.CREATE_COMMENT.START:
      return {
        ...state,
        createCommentLoading: true,
      };

    case types.CREATE_COMMENT.SUCCESS:
      return {
        ...state,
        createCommentLoading: false,
        postList: {
          ...state.postList,
          postListData: utils.updatePostList(state.postList.postListData, action.payload),
        },
      };

    case types.CREATE_COMMENT.FAILURE:
      return {
        ...state,
        createCommentLoading: false,
        error: action.payload,
      };

    case types.FETCH_USER_POST.START:
      return {
        ...state,
        userPost: {
          userPostData: [],
          userPostMeta: null,
          userPostLoading: true,
        },
      };

    case types.FETCH_USER_POST.SUCCESS:
      const userPostData = get(action, 'payload.data');
      const userPostMeta = get(action, 'payload.meta');
      return {
        ...state,
        userPost: {
          userPostData,
          userPostMeta,
          userPostLoading: false,
        },
      };

    case types.FETCH_USER_POST.FAILURE:
      return {
        ...state,
        userPost: {
          userPostData: [],
          userPostMeta: null,
          userPostLoading: false,
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;

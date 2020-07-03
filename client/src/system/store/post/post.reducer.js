import * as types from './post.types';

const INITIAL_STATE = {
  postList: {
    postListData: [],
    postListLoading: true,
  },
  createPostLoading: false,
  error: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_POST_LIST.START:
      return {
        ...state,
        postList: {
          postListData: [],
          postListLoading: true,
        },
      };

    case types.FETCH_POST_LIST.SUCCESS:
      return {
        ...state,
        postList: {
          postListData: action.payload,
          postListLoading: false,
        },
      };

    case types.FETCH_POST_LIST.START:
      return {
        ...state,
        postList: {
          postListData: [],
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

    default:
      return state;
  }
};

export default postReducer;

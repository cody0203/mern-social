import { createAction } from "redux-actions";
import * as types from "./post.types";

export const fetchPostListStart = createAction(types.FETCH_POST_LIST.START);

export const fetchPostListSuccess = createAction(
  types.FETCH_POST_LIST.SUCCESS,
  (payload) => payload
);

export const fetchPostListFailure = createAction(
  types.FETCH_POST_LIST.FAILURE,
  (error) => error
);

export const createPostStart = createAction(
  types.CREATE_POST.START,
  (payload) => payload
);

export const createPostSuccess = createAction(
  types.CREATE_POST.SUCCESS,
  (payload) => payload
);

export const createPostFailure = createAction(
  types.CREATE_POST.FAILURE,
  (error) => error
);

export const updatePostStart = createAction(
  types.UPDATE_POST.START,
  (payload) => payload
);

export const updatePostSuccess = createAction(
  types.UPDATE_POST.SUCCESS,
  (payload) => payload
);

export const updatePostFailure = createAction(
  types.UPDATE_POST.FAILURE,
  (error) => error
);

export const likePostStart = createAction(
  types.LIKE_POST.START,
  (payload) => payload
);

export const likePostSuccess = createAction(
  types.LIKE_POST.SUCCESS,
  (payload) => payload
);

export const likePostFailure = createAction(
  types.LIKE_POST.FAILURE,
  (error) => error
);

export const createCommentStart = createAction(
  types.CREATE_COMMENT.START,
  (payload) => payload
);

export const createCommentSuccess = createAction(
  types.CREATE_COMMENT.SUCCESS,
  (payload) => payload
);

export const createCommentFailure = createAction(
  types.CREATE_COMMENT.FAILURE,
  (error) => error
);

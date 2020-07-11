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

export const deletePostStart = createAction(
  types.DELETE_POST.START,
  (payload) => payload
);

export const deletePostSuccess = createAction(
  types.DELETE_POST.SUCCESS,
  (payload) => payload
);

export const deletePostFailure = createAction(
  types.DELETE_POST.FAILURE,
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

export const fetchUserPostStart = createAction(
  types.FETCH_USER_POST.START,
  (payload) => payload
);

export const fetchUserPostSuccess = createAction(
  types.FETCH_USER_POST.SUCCESS,
  (payload) => payload
);

export const fetchUserPostFailure = createAction(
  types.FETCH_USER_POST.FAILURE,
  (error) => error
);

export const updatePostListData = createAction(
  types.UPDATE_POST_LIST_DATA,
  (payload) => payload
);

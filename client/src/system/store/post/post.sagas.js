import { put, call, takeLatest } from "redux-saga/effects";
import get from "lodash/get";

import * as actions from "./post.actions";
import { HTTP_STATUS } from "../../request/request";
import * as apis from "./post.apis";

function* fetchPostList() {
  try {
    const response = yield call(apis.fetchPostList);

    const { data } = response.data;

    yield put(actions.fetchPostListSuccess(data));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.fetchPostListFailure(errorMessage));
  }
}

function* createPost({ payload }) {
  try {
    const response = yield call(apis.createPost, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.createPostSuccess(data));
    } else {
      yield put(actions.createPostFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.createPostFailure(errorMessage));
  }
}

function* updatePost({ payload }) {
  try {
    const response = yield call(apis.updatePost, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.updatePostSuccess(data));
    } else {
      yield put(actions.updatePostFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.updatePostFailure(errorMessage));
  }
}

function* likePost({ payload }) {
  try {
    const response = yield call(apis.likePost, payload);

    const { data } = response.data;

    yield put(actions.likePostSuccess(data));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.likePostFailure(errorMessage));
  }
}

function* createComment({ payload }) {
  try {
    const response = yield call(apis.createComment, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;

      yield put(actions.createCommentSuccess(data));
    } else {
      yield put(actions.createCommentFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.createCommentFailure(errorMessage));
  }
}

export default function* postSagas() {
  yield takeLatest(actions.fetchPostListStart, fetchPostList);
  yield takeLatest(actions.createPostStart, createPost);
  yield takeLatest(actions.updatePostStart, updatePost);
  yield takeLatest(actions.likePostStart, likePost);
  yield takeLatest(actions.createCommentStart, createComment);
}

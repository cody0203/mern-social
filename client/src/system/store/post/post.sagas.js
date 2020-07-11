import { put, call, takeLatest } from "redux-saga/effects";
import get from "lodash/get";

import * as actions from "./post.actions";
import { HTTP_STATUS } from "../../request/request";
import * as apis from "./post.apis";

function* fetchPostList({ payload }) {
  try {
    const response = yield call(apis.fetchPostList, payload);

    const { data, meta } = response.data;

    yield put(actions.fetchPostListSuccess({ data, meta }));
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
      yield put(actions.updatePostSuccess());
      yield put(actions.updatePostListData(data));
    } else {
      yield put(actions.updatePostFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.updatePostFailure(errorMessage));
  }
}

function* deletePost({ payload }) {
  try {
    const response = yield call(apis.deletePost, payload);
    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.deletePostSuccess(data));
    } else {
      yield put(actions.deletePostFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.deletePostFailure(errorMessage));
  }
}

function* likePost({ payload }) {
  try {
    const response = yield call(apis.likePost, payload);

    const { data } = response.data;

    yield put(actions.likePostSuccess());
    yield put(actions.updatePostListData(data));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.likePostFailure(errorMessage));
  }
}

function* fetchUserPost({ payload }) {
  try {
    const response = yield call(apis.fetchUserPost, payload);

    const { data, meta } = response.data;

    yield put(actions.fetchUserPostSuccess({ data, meta }));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.fetchPostListFailure(errorMessage));
  }
}

export default function* postSagas() {
  yield takeLatest(actions.fetchPostListStart, fetchPostList);
  yield takeLatest(actions.createPostStart, createPost);
  yield takeLatest(actions.updatePostStart, updatePost);
  yield takeLatest(actions.likePostStart, likePost);
  yield takeLatest(actions.fetchUserPostStart, fetchUserPost);
  yield takeLatest(actions.deletePostStart, deletePost);
}

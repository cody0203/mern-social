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
      yield put(actions.createPostSuccess());
    } else {
      yield put(actions.createPostFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.createPostFailure(errorMessage));
  }
}

export default function* postSagas() {
  yield takeLatest(actions.fetchPostListStart, fetchPostList);
  yield takeLatest(actions.createPostStart, createPost);
}

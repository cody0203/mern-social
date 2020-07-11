import { put, call, takeLatest } from "redux-saga/effects";
import get from "lodash/get";

import * as actions from "./comment.actions";
import * as postActions from "../post/post.actions";
import { HTTP_STATUS } from "../../request/request";
import * as apis from "./comment.apis";

function* createComment({ payload }) {
  try {
    const response = yield call(apis.createComment, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;

      yield put(actions.createCommentSuccess());
      yield put(postActions.updatePostListData(data));
    } else {
      yield put(actions.createCommentFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.createCommentFailure(errorMessage));
  }
}

function* likeComment({ payload }) {
  try {
    const response = yield call(apis.likeComment, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.likeCommentSuccess());
      yield put(postActions.updatePostListData(data));
    } else {
      yield put(actions.likeCommentFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.likeCommentFailure(errorMessage));
  }
}

export default function* commentSagas() {
  yield takeLatest(actions.createCommentStart, createComment);
  yield takeLatest(actions.likeCommentStart, likeComment);
}

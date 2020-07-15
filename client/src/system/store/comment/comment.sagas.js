import { put, call, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';

import * as actions from './comment.actions';
import * as postActions from '../post/post.actions';
import { HTTP_STATUS } from '../../request/request';
import * as apis from './comment.apis';

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
    const errorMessage = get(err, 'response.data.error', err.message);
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
    const errorMessage = get(err, 'response.data.error', err.message);
    yield put(actions.likeCommentFailure(errorMessage));
  }
}

function* deleteComment({ payload }) {
  try {
    const response = yield call(apis.deleteComment, payload);
    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.deleteCommentSuccess());
      yield put(postActions.updatePostListData(data));
    } else {
      yield put(actions.deleteCommentFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, 'response.data.error', err.message);

    yield put(actions.deleteCommentFailure(errorMessage));
  }
}

function* createReply({ payload }) {
  try {
    const response = yield call(apis.createReply, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;

      yield put(actions.createReplySuccess());
      yield put(postActions.updatePostListData(data));
    } else {
      yield put(actions.createReplyFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, 'response.data.error', err.message);
    yield put(actions.createReplyFailure(errorMessage));
  }
}

function* deleteReply({ payload }) {
  try {
    const response = yield call(apis.deleteReply, payload);
    if (response.status === HTTP_STATUS.SUCCESS) {
      const { data } = response.data;
      yield put(actions.deleteReplySuccess());
      yield put(postActions.updatePostListData(data));
    } else {
      yield put(actions.deleteReplyFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, 'response.data.error', err.message);
    yield put(actions.deleteReplyFailure(errorMessage));
  }
}

export default function* commentSagas() {
  yield takeLatest(actions.createCommentStart, createComment);
  yield takeLatest(actions.likeCommentStart, likeComment);
  yield takeLatest(actions.deleteCommentStart, deleteComment);
  yield takeLatest(actions.createReplyStart, createReply);
  yield takeLatest(actions.deleteReplyStart, deleteReply);
}

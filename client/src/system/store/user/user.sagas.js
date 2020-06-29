import { put, call, takeLatest } from "redux-saga/effects";
import get from "lodash/get";

import * as actions from "./user.actions";
import * as authActions from "../auth/auth.actions";
import { HTTP_STATUS } from "../../request/request";
import * as apis from "./user.apis";

import auth from "../../auth/auth-helper";

function* fetchUserList() {
  try {
    const response = yield call(apis.fetchUserList);

    const { data } = response.data;

    yield put(actions.fetchUserListSuccess(data));
  } catch (err) {
    yield put(actions.fetchUserListFailure(err));
  }
}

function* signUp({ payload }) {
  try {
    const response = yield call(apis.signUp, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      yield put(actions.signUpSuccess());
    } else {
      yield put(actions.signUpFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.signUpFailure(errorMessage));
  }
}

function* fetchUser({ payload }) {
  try {
    const response = yield call(apis.fetchUser, payload);
    const data = response.data;

    yield put(actions.fetchUserSuccess(data));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.fetchUserFailure(errorMessage));
  }
}

function* removeUser({ payload }) {
  try {
    const response = yield call(apis.removeUser, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      yield put(actions.removeUserSuccess());
      yield put(authActions.clearAuthState());
      auth.clearToken();
    } else {
      yield put(actions.removeUserFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.removeUserFailure(errorMessage));
  }
}

function* updateUser({ payload }) {
  try {
    const response = yield call(apis.updateUser, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      yield put(actions.updateUserSuccess());
    } else {
      yield put(actions.updateUserFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);
    yield put(actions.updateUserFailure(errorMessage));
  }
}

export default function* userReducer() {
  yield takeLatest(actions.fetchUserListStart, fetchUserList);
  yield takeLatest(actions.signUpStart, signUp);
  yield takeLatest(actions.fetchUserStart, fetchUser);
  yield takeLatest(actions.removeUserStart, removeUser);
  yield takeLatest(actions.updateUserStart, updateUser);
}

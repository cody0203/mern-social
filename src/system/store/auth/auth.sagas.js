import { put, call, takeLatest } from "redux-saga/effects";
import get from "lodash/get";
import * as actions from "./auth.actions";
import { HTTP_STATUS } from "../../request/request";
import * as apis from "./auth.apis";

import auth from "../../auth/auth-helper";
import history from "../../MainRouter";

function* signIn({ payload }) {
  try {
    const response = yield call(apis.signIn, payload);

    if (response.status === HTTP_STATUS.SUCCESS) {
      const { user, token } = response.data;

      yield auth.authenticate(token);
      yield put(actions.signInSuccess(user));
    } else {
      yield put(actions.signInFailure(response.status));
    }
  } catch (err) {
    const errorMessage = get(err, "response.data.message", err.message);

    yield put(actions.signInFailure(errorMessage));
  }
}

function* fetchUserInfo() {
  try {
    const response = yield call(apis.fetchUserInfo);
    const { user } = response.data;

    yield put(actions.fetchUserInfoSuccess(user));
  } catch (err) {
    const errorMessage = get(err, "response.data.error", err.message);

    yield put(actions.signInFailure(errorMessage));
  }
}

export default function* authSagas() {
  yield takeLatest(actions.signInStart, signIn);
  yield takeLatest(actions.fetchUserInfoStart, fetchUserInfo);
}

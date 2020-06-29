import { fork, all } from "redux-saga/effects";
import userSagas from "./store/user/user.sagas";
import authSagas from "./store/auth/auth.sagas";

export default function* rootSaga() {
  yield all([fork(userSagas), fork(authSagas)]);
}

import { createAction } from "redux-actions";
import * as types from "./auth.types";

export const signInStart = createAction(
  types.SIGN_IN.START,
  (payload) => payload
);

export const signInSuccess = createAction(
  types.SIGN_IN.SUCCESS,
  (payload) => payload
);

export const signInFailure = createAction(
  types.SIGN_IN.FAILURE,
  (error) => error
);

export const fetchUserInfoStart = createAction(types.FETCH_USER_INFO.START);
export const fetchUserInfoSuccess = createAction(
  types.FETCH_USER_INFO.SUCCESS,
  (payload) => payload
);
export const fetchUserInfoFailure = createAction(
  types.FETCH_USER_INFO.FAILURE,
  (error) => error
);

export const clearAuthState = createAction(types.CLEAR_AUTH_STATE);

export const clearSignInState = createAction(types.CLEAR_SIGN_IN_STATE);

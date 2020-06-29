import { createAction } from "redux-actions";
import * as types from "./user.types";

export const fetchUserListStart = createAction(types.FETCH_USER_LIST.START);
export const fetchUserListSuccess = createAction(
  types.FETCH_USER_LIST.SUCCESS,
  (payload) => payload
);
export const fetchUserListFailure = createAction(
  types.FETCH_USER_LIST.FAILURE,
  (error) => error
);

export const signUpStart = createAction(
  types.SIGN_UP.START,
  (payload) => payload
);

export const signUpSuccess = createAction(
  types.SIGN_UP.SUCCESS,
  (payload) => payload
);

export const signUpFailure = createAction(
  types.SIGN_UP.FAILURE,
  (error) => error
);

export const fetchUserStart = createAction(
  types.FETCH_USER.START,
  (payload) => payload
);

export const fetchUserSuccess = createAction(
  types.FETCH_USER.SUCCESS,
  (payload) => payload
);

export const fetchUserFailure = createAction(
  types.FETCH_USER.FAILURE,
  (error) => error
);

export const removeUserStart = createAction(
  types.REMOVE_USER.START,
  (payload) => payload
);

export const removeUserSuccess = createAction(types.REMOVE_USER.SUCCESS);

export const removeUserFailure = createAction(
  types.REMOVE_USER.FAILURE,
  (payload) => payload
);

export const updateUserStart = createAction(
  types.UPDATE_USER.START,
  (payload) => payload
);

export const updateUserSuccess = createAction(
  types.UPDATE_USER.SUCCESS,
  (payload) => payload
);

export const updateUserFailure = createAction(
  types.UPDATE_USER.FAILURE,
  (payload) => payload
);

export const clearSignUpState = createAction(types.CLEAR_SIGN_UP_STATE);

export const clearUserState = createAction(types.CLEAR_USER_STATE);

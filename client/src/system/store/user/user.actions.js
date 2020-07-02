import { createAction } from 'redux-actions';
import * as types from './user.types';

export const fetchUserListStart = createAction(types.FETCH_USER_LIST.START);
export const fetchUserListSuccess = createAction(types.FETCH_USER_LIST.SUCCESS, (payload) => payload);
export const fetchUserListFailure = createAction(types.FETCH_USER_LIST.FAILURE, (error) => error);

export const signUpStart = createAction(types.SIGN_UP.START, (payload) => payload);

export const signUpSuccess = createAction(types.SIGN_UP.SUCCESS, (payload) => payload);

export const signUpFailure = createAction(types.SIGN_UP.FAILURE, (error) => error);

export const fetchUserStart = createAction(types.FETCH_USER.START, (payload) => payload);

export const fetchUserSuccess = createAction(types.FETCH_USER.SUCCESS, (payload) => payload);

export const fetchUserFailure = createAction(types.FETCH_USER.FAILURE, (error) => error);

export const removeUserStart = createAction(types.REMOVE_USER.START, (payload) => payload);

export const removeUserSuccess = createAction(types.REMOVE_USER.SUCCESS);

export const removeUserFailure = createAction(types.REMOVE_USER.FAILURE, (payload) => payload);

export const updateUserStart = createAction(types.UPDATE_USER.START, (payload) => payload);

export const updateUserSuccess = createAction(types.UPDATE_USER.SUCCESS, (payload) => payload);

export const updateUserFailure = createAction(types.UPDATE_USER.FAILURE, (payload) => payload);

export const followUserStart = createAction(types.FOLLOW_USER.START, (payload) => payload);

export const followUserSuccess = createAction(types.FOLLOW_USER.SUCCESS, (payload) => payload);

export const followUserFailure = createAction(types.FOLLOW_USER.FAILURE, (error) => error);

export const unFollowUserStart = createAction(types.UN_FOLLOW_USER.START, (payload) => payload);

export const unFollowUserSuccess = createAction(types.UN_FOLLOW_USER.SUCCESS, (payload) => payload);

export const unFollowUserFailure = createAction(types.UN_FOLLOW_USER.FAILURE, (error) => error);

export const fetchWhoToFollowStart = createAction(types.FETCH_WHO_TO_FOLLOW.START, (payload) => payload);

export const fetchWhoToFollowSuccess = createAction(types.FETCH_WHO_TO_FOLLOW.SUCCESS, (payload) => payload);

export const fetchWhoToFollowFailure = createAction(types.FETCH_WHO_TO_FOLLOW.FAILURE, (error) => error);

export const clearSignUpState = createAction(types.CLEAR_SIGN_UP_STATE);

export const clearUserState = createAction(types.CLEAR_USER_STATE);

import { createAction } from 'redux-actions';
import * as types from './comment.types';

export const createCommentStart = createAction(types.CREATE_COMMENT.START, (payload) => payload);

export const createCommentSuccess = createAction(types.CREATE_COMMENT.SUCCESS);

export const createCommentFailure = createAction(types.CREATE_COMMENT.FAILURE, (error) => error);

export const likeCommentStart = createAction(types.LIKE_COMMENT.START, (payload) => payload);

export const likeCommentSuccess = createAction(types.LIKE_COMMENT.SUCCESS);

export const likeCommentFailure = createAction(types.LIKE_COMMENT.FAILURE, (error) => error);

export const editCommentStart = createAction(types.EDIT_COMMENT.START, (payload) => payload);

export const editCommentSuccess = createAction(types.EDIT_COMMENT.SUCCESS, (payload) => payload);

export const editCommentFailure = createAction(types.EDIT_COMMENT.FAILURE, (error) => error);

export const deleteCommentStart = createAction(types.DELETE_COMMENT.START, (payload) => payload);

export const deleteCommentSuccess = createAction(types.DELETE_COMMENT.SUCCESS, (payload) => payload);

export const deleteCommentFailure = createAction(types.DELETE_COMMENT.FAILURE, (error) => error);

export const createReplyStart = createAction(types.CREATE_REPLY.START, (payload) => payload);

export const createReplySuccess = createAction(types.CREATE_REPLY.SUCCESS, (payload) => payload);

export const createReplyFailure = createAction(types.CREATE_REPLY.FAILURE, (error) => error);

export const deleteReplyStart = createAction(types.DELETE_REPLY.START, (payload) => payload);

export const deleteReplySuccess = createAction(types.DELETE_REPLY.SUCCESS, (payload) => payload);

export const deleteReplyFailure = createAction(types.DELETE_REPLY.FAILURE, (error) => error);

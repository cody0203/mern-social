import { createAction } from "redux-actions";
import * as types from "./comment.types";

export const createCommentStart = createAction(
  types.CREATE_COMMENT.START,
  (payload) => payload
);

export const createCommentSuccess = createAction(types.CREATE_COMMENT.SUCCESS);

export const createCommentFailure = createAction(
  types.CREATE_COMMENT.FAILURE,
  (error) => error
);

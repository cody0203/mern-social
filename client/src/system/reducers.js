import { combineReducers } from "redux";

import userReducer from "./store/user/user.reducer";
import authReducer from "./store/auth/auth.reducer";
import postReducer from "./store/post/post.reducer";
import commentReducer from "./store/comment/comment.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  authReducer: authReducer,
  postReducer: postReducer,
  commentReducer: commentReducer,
});

export default rootReducer;

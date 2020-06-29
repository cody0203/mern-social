import { combineReducers } from "redux";

import userReducer from "./store/user/user.reducer";
import authReducer from "./store/auth/auth.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  authReducer: authReducer,
});

export default rootReducer;

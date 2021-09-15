import * as types from "./auth.types";

const INITIAL_STATE = {
  signIn: {
    signInLoading: false,
    signInError: null,
  },
  userInfo: {},
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN.START:
      return {
        ...state,
        signIn: {
          signInLoading: true,
          signInError: null,
        },
        userInfo: {},
      };

    case types.SIGN_IN.SUCCESS:
      return {
        ...state,
        signIn: {
          signInLoading: false,
          signInError: null,
        },
        userInfo: action.payload,
      };

    case types.SIGN_IN.FAILURE:
      return {
        ...state,
        signIn: {
          signInLoading: false,
          signInError: action.payload,
        },
        userInfo: {},
      };

    case types.FETCH_USER_INFO.SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };

    case types.FETCH_USER_INFO.FAILURE:
      return {
        ...state,
        userInfo: {},
        error: action.payload,
      };

    case types.CLEAR_SIGN_IN_STATE:
      return {
        ...state,
        signIn: {
          signInLoading: false,
          signInError: null,
        },
      };

    case types.CLEAR_AUTH_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;

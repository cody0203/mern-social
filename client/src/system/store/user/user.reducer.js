import * as types from "./user.types";

const INITIAL_STATE = {
  userList: {
    userListData: [],
    userListLoading: true,
  },
  signUp: {
    signUpLoading: false,
    signUpStatus: false,
    signUpError: null,
  },
  userProfile: {
    userProfileData: {},
    userProfileLoading: true,
  },
  updateUser: {
    updateUserLoading: false,
    updateUserError: null,
  },
  removeUserLoading: false,
  followUserLoading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USER_LIST.START:
      return {
        ...state,
        userList: {
          userListData: [],
          userListLoading: true,
        },
      };

    case types.FETCH_USER_LIST.SUCCESS:
      return {
        ...state,
        userList: {
          userListData: action.payload,
          userListLoading: false,
        },
      };

    case types.FETCH_USER_LIST.FAILURE:
      return {
        ...state,
        userList: {
          userListData: [],
          userListLoading: false,
        },
        error: action.payload,
      };

    case types.SIGN_UP.START:
      return {
        ...state,
        signUp: {
          signUpLoading: true,
          signUpStatus: false,
        },
      };

    case types.SIGN_UP.SUCCESS:
      return {
        ...state,
        signUp: {
          signUpLoading: false,
          signUpStatus: true,
        },
      };

    case types.SIGN_UP.FAILURE:
      return {
        ...state,
        signUp: {
          signUpLoading: false,
          signUpStatus: false,
          signUpError: action.payload,
        },
      };

    case types.FETCH_USER.START:
      return {
        ...state,
        userProfile: {
          userProfileData: {},
          userProfileLoading: true,
        },
      };

    case types.FETCH_USER.SUCCESS:
      return {
        ...state,
        userProfile: {
          userProfileData: action.payload,
          userProfileLoading: false,
        },
      };

    case types.FETCH_USER.FAILURE:
      return {
        ...state,
        userProfile: {
          userProfileLoading: false,
          userProfileData: {},
        },
        error: action.payload,
      };

    case types.REMOVE_USER.START:
      return {
        ...state,
        removeUserLoading: true,
      };

    case types.REMOVE_USER.SUCCESS:
      return {
        ...state,
        removeUserLoading: false,
      };

    case types.REMOVE_USER.FAILURE:
      return {
        ...state,
        removeUserLoading: false,
        error: action.payload,
      };

    case types.UPDATE_USER.START:
      return {
        ...state,
        updateUser: {
          updateUserLoading: true,
          updateUserError: null,
        },
      };

    case types.UPDATE_USER.SUCCESS:
      return {
        ...state,
        updateUser: {
          updateUserLoading: false,
          updateUserError: null,
        },
      };

    case types.UPDATE_USER.FAILURE:
      return {
        ...state,
        updateUser: {
          updateUserLoading: false,
          updateUserError: action.payload,
        },
      };

    case types.CLEAR_SIGN_UP_STATE:
      return {
        ...state,
        signUp: {
          signUpLoading: false,
          signUpStatus: false,
        },
      };

    case types.FOLLOW_USER.START:
      return {
        ...state,
        followUserLoading: true,
      };

    case types.FOLLOW_USER.SUCCESS:
      return {
        ...state,
        followUserLoading: false,
        userProfile: {
          ...state.userProfile,
          userProfileData: action.payload,
        },
      };

    case types.FOLLOW_USER.FAILURE:
      return {
        ...state,
        followUserLoading: false,
        error: action.payload,
      };

    case types.CLEAR_USER_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;

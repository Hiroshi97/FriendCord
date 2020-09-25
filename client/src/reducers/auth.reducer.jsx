const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem("user")) || {},
  result: localStorage.getItem("user") ? true : false,
  errors: []
};

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "SIGNUP_FAILURE";
const LOGOUT = "LOGOUT";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        result: true,
        userInfo: payload,
        errors: []
      };

    case SIGNUP_FAILURE: 
     return {
       loading: false,
       result: false,
       userInfo: {},
       errors: payload
     }

    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        loading: false,
        result: false,
        userInfo: {},
        errors: []
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        userInfo: {...payload}
      };
    case UPDATE_PROFILE_SUCCESS: 
    return {
      ...state,
      userInfo: {...payload}
    }

    case UPDATE_PROFILE_FAILURE:
    default:
      return state;
  }
};

export default AuthReducer;

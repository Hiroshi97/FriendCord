const initialState = {
  loading: false,
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
        errors: []
      };

    case SIGNUP_FAILURE: 
     return {
       loading: false,
       result: false,
       errors: payload
     }

    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        loading: false,
        result: false,
        errors: []
      };

    default:
      return state;
  }
};

export default AuthReducer;

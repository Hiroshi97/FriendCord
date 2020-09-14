import axios from "axios";
import { triggerAlert } from "../utils/trigger-alert";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const logout = () => {
  triggerAlert("success", "LOGOUT SUCCESS", "You have successfully logged out!");
  return {
    type: LOGOUT,
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        axios.post("user/friends", { username: res.data.username }).then((res) => {
          localStorage.setItem("friends", JSON.stringify(res.data.friendships));
        });
        setTimeout(() => {
          dispatch(loginSuccess());
          triggerAlert(
            "success",
            "LOGIN SUCCESS",
            "You have successfully logged in!"
          );
        }, 2000);
      })
      .catch((error) => {
        dispatch(loginFailure());
        triggerAlert("error", "SOMETHING WRONG", error.response.data.msg);
      });
  };
};

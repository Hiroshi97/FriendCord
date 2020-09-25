import axios from "axios";
import { triggerAlert } from "../utils/trigger-alert";

const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (userInfo) => ({
  type: SIGNUP_SUCCESS,
  payload: userInfo,
});

export const signupFailure = (errors) => ({
  type: SIGNUP_FAILURE,
  payload: errors,
});

export const signup = (userInfo) => {
  return (dispatch) => {
    dispatch(signupRequest());
    axios
      .post("/auth/signup", {
        ...userInfo,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        axios
          .post("user/friends", { _id: res.data.auth_id })
          .then((response) => {
            console.log(response);
            localStorage.setItem(
              "friends",
              JSON.stringify(response.data.friendships)
            );
          });
        setTimeout(() => {
          dispatch(signupSuccess(res.data));
          triggerAlert(
            "success",
            "SIGN UP SUCCESS",
            "You have successfully signed up!"
          );
        }, 2000);
      })
      .catch((error) => {
        dispatch(signupFailure(error.response.data.errors));
      });
  };
};

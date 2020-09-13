import axios from "axios";
import { triggerAlert } from "../utils/trigger-alert";

const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupFailure = () => ({
  type: SIGNUP_FAILURE
});

// export const signup = (userInfo) => {
//   return (dispatch) => {
//     dispatch(signupRequest());
//     axios
//       .post("/auth/signup", {
//         ...userInfo,
//       })
//       .then((res) => {
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setTimeout(() => {
//           dispatch(signupSuccess());
//           triggerAlert(
//             "success",
//             "SIGN UP SUCCESS",
//             "You have successfully signed up!"
//           );
//         }, 3000);
//       })
//       .catch((error) => {
//         console.log(error.response);

//       });
//   };
// };

import axios from "axios";

const GET_MESSAGES = "GET_MESSAGES";
const POST_MESSAGE = "POST_MESSAGE";

export const getMessages = (payload) => {
  return {
    type: GET_MESSAGES,
    payload,
  };
};

export const postMessage = (payload) => ({
  type: POST_MESSAGE,
  payload
});

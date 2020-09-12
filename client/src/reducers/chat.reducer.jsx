const GET_MESSAGES = "GET_MESSAGES";
const POST_MESSAGE = "POST_MESSAGE";

const ChatsReducer = (state = { messages: [] }, { type, payload }) => {
  switch (type) {
    case GET_MESSAGES:
      return { ...state, messages: [...payload] };

    case POST_MESSAGE:
      state.messages.push(payload);
      return { ...state, messages: [...state.messages] };

    default:
      return state;
  }
};

export default ChatsReducer;

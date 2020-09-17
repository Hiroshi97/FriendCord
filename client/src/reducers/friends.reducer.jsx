const GET_FRIENDS_REQUEST = "GET_FRIENDS_REQUEST";
const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
const GET_FRIENDS_FAILURE = "GET_FRIENDS_FAILURE";

const initialState = {
  friends: JSON.parse(localStorage.getItem("friends")) || [],
  loading: false,
};

const FriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, loading: true };

    case GET_FRIENDS_SUCCESS:
      return { loading: false, friends: action.payload };

    case GET_FRIENDS_FAILURE:
      return {
        loading: false,
        friends: JSON.parse(localStorage.getItem("friends")) || [],
      };
    default:
      return state;
  }
};

export default FriendsReducer;

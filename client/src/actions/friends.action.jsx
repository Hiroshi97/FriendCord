const GET_FRIENDS_REQUEST = "GET_FRIENDS_REQUEST";
const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
const GET_FRIENDS_FAILURE = "GET_FRIENDS_FAILURE";

const getFriendsRequest = () => ({
  type: GET_FRIENDS_REQUEST,
});

const getFriendsSuccess = (payload) => ({
  type: GET_FRIENDS_SUCCESS,
  payload,
});

const getFriendsFailure = () => ({
  type: GET_FRIENDS_FAILURE
});

export const getFriends = () => {
  return (dispatch) => {
    dispatch(getFriendsRequest());
    axios
      .post("user/friends", { username: res.data.username })
      .then((res) => {
        localStorage.setItem("friends", JSON.stringify(res.data.friendships));
        dispatch(getFriendsSuccess(res.data.friendships));
      })
      .catch((error) => {
        dispatch(getFriendFailure());
      });
  };
};

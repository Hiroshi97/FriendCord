import Axios from "axios";

const updateAvatarSuccess = (payload) => ({
  type: "UPDATE_PROFILE_SUCCESS",
  payload
});

const updateAvatarFailure = () => ({
    type: "UPDATE_PROFILE_FAILURE"
  });

export const updateAvatar = (username, avatar) => {
  return async (dispatch) => {
      try {
        let formData = new FormData();
        console.log(process.env.REACT_APP_IMGBB_APIKEY);
        formData.set('key', process.env.REACT_APP_IMGBB_APIKEY);
        formData.append('image', avatar)
        const imgURL = await Axios.post('https://api.imgbb.com/1/upload', formData, {headers: {
          'Content-Type': 'multipart/form-data'
        }});
        const res = await Axios.post('user/updateAvatar', {username, avatar: imgURL.data.data.display_url});
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(updateAvatarSuccess(res.data));
      }
      catch (error) {
          console.log(error.message);
        dispatch(updateAvatarFailure());
      }
  };
};

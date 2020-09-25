import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Image, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../actions/user.action";

const SettingsWrapper = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.authState.userInfo);
  const avatarUploadRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [disable, setDisable] = useState(true);
  const handleChangeAvatar = (e) => {
    e.preventDefault();
    console.log(avatarUploadRef);
    avatarUploadRef.current.click();
  };

  const handleUploadAvatar = (e) => {
    const files = e.target.files;
    if (files && files.length > 0 ) {
      if (files[0].type.includes("image")) {
        avatarRef.current = files[0];
        setAvatar(URL.createObjectURL(files[0]));
        setTimeout(()=>{setDisable(false)}, 500);
      }
    }
  }

  const handleClickClose = (e) => {
    handleClose();
    setTimeout(()=>{setAvatar(userInfo.avatar); setDisable(true);}, 500); 
  }

  const handleClickSave = (e) => {
    dispatch(updateAvatar(userInfo.username, avatarRef.current));
    handleClose();
    setDisable(true);
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.File ref={avatarUploadRef} id="avatarUpload" onChange={handleUploadAvatar}/>
          <div className="text-center">
            <div className="avatar-settings">
              <div className="avatar-overlay text-dark">
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <Image
                className="d-block mx-auto mt-3"
                src={avatar}
                alt=""
                roundedCircle
                onClick={handleChangeAvatar}
              />
            </div>
            <p>{userInfo.username}</p>
            <ul className="list-unstyled text-left">
              <li>Name: {userInfo.name}</li>
              <li>Email: {userInfo.email}</li>
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Close
          </Button>
          <Button variant="primary" disabled={disable} onClick={handleClickSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(SettingsWrapper);

SettingsWrapper.propTypes = {
  show: PropTypes.bool,
  handleSWClose: PropTypes.func,
};

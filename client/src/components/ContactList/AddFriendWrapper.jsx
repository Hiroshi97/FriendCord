import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Image, Toast } from "react-bootstrap";
import axios from "axios";

export default function AddFriendWrapper({ friends, show, handleClose }) {
  const usernameRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [personInfo, setPersonInfo] = useState(null);
  const [showError, setShowError] = useState(false);
  const handleCloseModal = () => {
    handleClose();
    setPersonInfo(null);
  };

  const handleSearch = () => {
    if (usernameRef.current.value) {
      axios.get("/user/" + usernameRef.current.value).then((res) => {
        const { user } = res.data;
        if (user === null) setShowError(true);
        setPersonInfo(user);
      });
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        
        <Toast show={showError} onClose={() => setShowError(false)} delay={2000} autohide>
          <Toast.Body>A user is not found</Toast.Body>
        </Toast>


          <Form.Control
            ref={usernameRef}
            autoComplete="off"
            id="usernameInput"
            placeholder="Search friends..."
            className="username-input"
            defaultValue=""
          />
          {personInfo && (
            <div className="text-center">
              <Image
                className="d-block mx-auto mt-2"
                src={personInfo.avatar}
                alt=""
                roundedCircle
              />
              <p>{personInfo.username}</p>
              <ul className="list-unstyled text-left">
                <li>Name: {personInfo.name}</li>
                <li>Email: {personInfo.email}</li>
              </ul>
              { (friends.some((friend)=>friend.friend.username === personInfo.username)) ? <p>You and <strong>{personInfo.username}</strong> are friends.</p> : ((userInfo.username !== personInfo.username) ? <Button> Add Friend </Button> : null)}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

AddFriendWrapper.propTypes = {
  friends: PropTypes.array,
  show: PropTypes.bool,
  handleAFWClose: PropTypes.func,
};

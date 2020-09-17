import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Image, Toast } from "react-bootstrap";
import axios from "axios";

const AddFriendWrapper = ({
  friends,
  show,
  handleClose,
  handleAddFriend,
  handleCancelFriend,
}) => {
  const usernameRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
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

  const handleClickAddFriend = (id1, id2) => {
    handleAddFriend(id1, id2);
    handleCloseModal();
  };

  const handleClickCancelFriend = (id1, id2) => {
    handleCancelFriend(id1, id2);
    handleCloseModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  const renderFriendStatus = () => {
    //Accepted Friend
    if (
      friends.some(
        (friend) =>
          friend.friend.username === personInfo.username &&
          friend.status === "accepted"
      )
    ) {
      return (
        <>
          <p>
            You and <strong>{personInfo.username}</strong> are friends.
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              handleClickCancelFriend(userInfo.auth_id, personInfo._id)
            }
          >
            {" "}
            Remove{" "}
          </Button>
        </>
      );
    }

    //Pending request (accept or not)
    if (
      friends.some(
        (friend) =>
          friend.friend.username === personInfo.username &&
          friend.status === "pending"
      )
    ) {
      return (
        <>
          <p>
            <strong>{personInfo.username}</strong> has sent you a friend
            request.
          </p>
          <Button
            onClick={() =>
              handleClickAddFriend(userInfo.auth_id, personInfo._id)
            }
          >
            {" "}
            Accept{" "}
          </Button>
          <Button
            className="ml-2"
            variant="secondary"
            onClick={() =>
              handleClickCancelFriend(userInfo.auth_id, personInfo._id)
            }
          >
            {" "}
            Cancel{" "}
          </Button>
        </>
      );
    }

    //Pending request (waiting for an acceptant)
    if (
      friends.some(
        (friend) =>
          friend.friend.username === personInfo.username &&
          friend.status === "requested"
      )
    ) {
      return (
        <>
          <p>
            You have sent <strong>{personInfo.username}</strong> a friend
            request.
          </p>
          <Button disabled={true}> Waiting for a respond </Button>
          <Button
            className="ml-2"
            variant="secondary"
            onClick={() =>
              handleClickCancelFriend(userInfo.auth_id, personInfo._id)
            }
          >
            {" "}
            Cancel{" "}
          </Button>
        </>
      );
    }

    if (userInfo.username !== personInfo.username) {
      return (
        <Button
          onClick={() => handleClickAddFriend(userInfo.auth_id, personInfo._id)}
        >
          {" "}
          Add Friend{" "}
        </Button>
      );
    }

    return null;
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Toast
            show={showError}
            onClose={() => setShowError(false)}
            delay={2000}
            autohide
          >
            <Toast.Body>A user is not found</Toast.Body>
          </Toast>

          <Form.Control
            ref={usernameRef}
            autoComplete="off"
            id="usernameInput"
            placeholder="Search friends..."
            className="username-input"
            defaultValue=""
            onKeyPress={handleKeyPress}
          />
          {personInfo && (
            <div className="text-center">
              <Image
                className="d-block mx-auto mt-3"
                src={personInfo.avatar}
                alt=""
                roundedCircle
              />
              <p>{personInfo.username}</p>
              <ul className="list-unstyled text-left">
                <li>Name: {personInfo.name}</li>
                <li>Email: {personInfo.email}</li>
              </ul>
              {renderFriendStatus()}
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
};

export default React.memo(AddFriendWrapper);

AddFriendWrapper.propTypes = {
  friends: PropTypes.array,
  show: PropTypes.bool,
  handleAFWClose: PropTypes.func,
  handleAddFriend: PropTypes.func,
  handleCancelFriend: PropTypes.func,
};

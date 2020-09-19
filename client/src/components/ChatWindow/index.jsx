import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
  Image,
  Toast,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faPhone,
  faVideo,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import MessageCard from "./MessageCard";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ChatWindow = ({
  selectedFriend,
  handleSubmitChatMessage,
  messages,
  handleAddFriend,
  handleCancelFriend,
}) => {
  console.log("ABC");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [showToast, setShowToast] = useState(false);
  const lastMessage = useRef(null);
  const prevLengthRef = useRef(messages.length);
  const containerRef = useRef(null);

  useEffect(() => {
    setShowToast(selectedFriend && selectedFriend.status === "pending");
  }, [selectedFriend]);

  useEffect(() => {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const handleSubmitMessage = (e) => {
    handleSubmitChatMessage(e);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleClickAddFriend = (id1, id2) => {
    handleAddFriend(id1, id2);
    handleCloseToast();
  };

  const handleClickCancelFriend = (id1, id2) => {
    handleCancelFriend(id1, id2);
    handleCloseToast();
  };

  const renderHeader = () => (
    <Card.Header>
      <Row>
        <div className="avatar-wrapper">
          <Image src={selectedFriend.friend.avatar} alt="" roundedCircle />
          <span className="status"></span>
        </div>
        <div className="username-wrapper mt-auto pl-2 text-left">
          <span className="font-weight-bold">
            {selectedFriend.friend.username}
          </span>
          <p>{selectedFriend.friend.email}</p>
        </div>
        <Col
          xs="12"
          sm="4"
          md="3"
          className="options-wrapper ml-auto mt-auto pb-4"
        >
          <Row className="align-items-center justify-content-end">
            <Button className="px-2">
              <FontAwesomeIcon icon={faVideo} />
            </Button>
            <Button className="px-2">
              <FontAwesomeIcon icon={faPhone} />
            </Button>
            <Button className="px-2">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
          </Row>
        </Col>
      </Row>
      <Toast show={showToast}>
        <Toast.Body>
          <p>
            {selectedFriend.friend.username + " has sent you a friend request"}
          </p>
          <Button
            size="sm"
            onClick={() =>
              handleClickAddFriend(userInfo.auth_id, selectedFriend._id)
            }
          >
            Accept
          </Button>
          <Button
            size="sm"
            className="ml-2"
            variant="secondary"
            onClick={() =>
              handleClickCancelFriend(userInfo.auth_id, selectedFriend._id)
            }
          >
            Cancel
          </Button>
        </Toast.Body>
      </Toast>
    </Card.Header>
  );

  const renderBody = () => (
    <Card.Body className="messages-window">
      <div className="messages">
        {messages.length > 0 &&
          messages.map((m, index) => (
            <div key={index}>
              <MessageCard
                text={m.message}
                sender={userInfo.auth_id === m.from}
                avatar={
                  userInfo.auth_id === m.from
                    ? userInfo.avatar
                    : selectedFriend.friend.avatar
                }
                messageTime={m.created_at}
              />
            </div>
          ))}
        <div ref={lastMessage} />
      </div>
    </Card.Body>
  );

  const renderFooter = () => (
    <Card.Footer>
      <Form autoComplete="off" onSubmit={handleSubmitMessage}>
        <InputGroup>
          <InputGroup.Prepend type="prepend">
            <Button variant="secondary">
              <FontAwesomeIcon icon={faPaperclip} />
            </Button>
          </InputGroup.Prepend>
          <Form.Control
            // as="textarea"
            // rows="2"
            autoComplete="off"
            id="messageInput"
            placeholder="Type a message..."
            className="message-input"
            defaultValue=""
            // onKeyPress={handleKeyPress}
          />
          <InputGroup.Append type="append">
            <Button
              type="submit"
              disabled={selectedFriend === ""}
              variant="secondary"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Card.Footer>
  );

  return (
    <>
      <Col className="text-center chat-window">
        <Card>
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </Card>
      </Col>
    </>
  );
};

ChatWindow.propTypes = {
  selectedFriend: PropTypes.object,
  handleSubmitChatMessage: PropTypes.func,
  messages: PropTypes.array,
  handleAddFriend: PropTypes.func,
  handleCancelFriend: PropTypes.func,
};

export default React.memo(ChatWindow);

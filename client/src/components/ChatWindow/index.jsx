import React from "react";
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faPhone,
  faVideo,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import MessageCard from "./MessageCard";

const ChatWindow = ({
  selectedFriend,
  messages,
  handleSubmitChatMessage,
  messageInput,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const handleSubmitMessage = (e) => {
    handleSubmitChatMessage(e);
  };

  return (
    <Col className="text-center chat-window">
      <Card>
        <Card.Header>
          <Row>
            <div className="avatar-wrapper">
              <img src={selectedFriend.friend.avatar} alt="" />
              <span className="status"></span>
            </div>
            <div className="username-wrapper mt-auto pl-2 text-left">
                <span className="font-weight-bold">
                  {selectedFriend.friend.username}
                </span>
                <p>{selectedFriend.friend.email}</p>
            </div>
            <Col xs="2" className="options-wrapper ml-auto mt-auto pb-4">
              <Row className="align-items-center justify-content-around">
                <Button>
                  <FontAwesomeIcon icon={faVideo} />
                </Button>
                <Button>
                  <FontAwesomeIcon icon={faPhone} />
                </Button>
                <Button>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="messages-window">
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
                />
              </div>
            ))}
        </Card.Body>
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
                defaultValue={messageInput}
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
      </Card>
    </Col>
  );
};

export default React.memo(ChatWindow);

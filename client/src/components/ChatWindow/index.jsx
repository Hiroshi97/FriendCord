import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button, InputGroup, Card, Image } from "react-bootstrap";
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

const ChatWindow = ({ selectedFriend, handleSubmitChatMessage, messages}) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const lastMessage = useRef(null);
  const prevLengthRef = useRef(messages.length);
  const containerRef = useRef(null);
  useEffect(() => {
    if(lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);
  const handleSubmitMessage = (e) => {
    handleSubmitChatMessage(e);
  };

  return (
    <>
      {selectedFriend && (
        <Col className="text-center chat-window">
          <Card>
            <Card.Header>
              <Row>
                <div className="avatar-wrapper">
                  <Image src={selectedFriend.friend.avatar} alt="" roundedCircle/>
                  <span className="status"></span>
                </div>
                <div className="username-wrapper mt-auto pl-2 text-left">
                  <span className="font-weight-bold">
                    {selectedFriend.friend.username}
                  </span>
                  <p>{selectedFriend.friend.email}</p>
                </div>
                <Col xs="12" sm="4" md="3" className="options-wrapper ml-auto mt-auto pb-4">
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
                      messageTime={m.created_at}
                    />
                  </div>
                ))}
              <div ref={lastMessage} />
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
          </Card>
        </Col>
      )}
    </>
  );
};

ChatWindow.propTypes = {
  selectedFriend: PropTypes.object,
  handleSubmitChatMessage: PropTypes.func,
  messages: PropTypes.array
};

export default React.memo(ChatWindow);

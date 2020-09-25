import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Nav,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCog,
  faSignOutAlt,
  faCommentDots,
  faUsers,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AddFriendWrapper from "./AddFriendWrapper";
import SettingsWrapper from "./SettingsWrapper";
import { useSelector } from "react-redux";

const ContactList = ({
  lastMessages,
  friends,
  handleSelectFriend,
  handleAddFriend,
  handleCancelFriend,
}) => {
  const [AFWshow, setAFWShow] = useState(false);
  const [SWshow, setSWShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chats");
  const userInfo = useSelector(state => state.authState.userInfo);

  //Add friend wrapper modal
  const handleAFWClose = () => setAFWShow(false);
  const handleAFWShow = () => setAFWShow(true);

  //Settings wrapper modal
  const handleSWClose = () => setSWShow(false);
  const handleSWShow = () => setSWShow(true);

  const onClickSelectFriend = (f) => {
    handleSelectFriend(f);
  };

  const onClickChat = (id) => {
    const index = friends.findIndex((friend) => friend._id === id);
    onClickSelectFriend(friends[index]);
  };

  //Last messages processor
  const processLastMessages = () => {
    const processed = lastMessages.map((message) => {
      if (message.from === userInfo.auth_id) {
        return {
          _id: message._id,
          userId: message.to,
          message: "You: " + message.message,
          username: getUsername(message.to),
          time: getTime(message.time),
        };
      } else {
        return {
          _id: message._id,
          userId: message.from,
          message: getUsername(message.from) + ": " + message.message,
          username: getUsername(message.from),
          time: getTime(message.time),
        };
      }
    });

    return processed;
  };

  //Get friend's avatar
  const getAvatar = (id) => {
    const index = friends.findIndex((friend) => friend._id === id);

    //Can't be -1 because the messages are from friends in friend list
    return friends[index].friend.avatar;
  };

  const getUsername = (id) => {
    const index = friends.findIndex((friend) => friend._id === id);
    if (index !== -1) return friends[index].friend.username;
    else return null;
  };

  const getTime = (time) => {
    const displayTime = new Date(time).toISOString().split("T")[1].slice(0, 5);
    return displayTime;
  };

  const renderHeader = () => (
    <Card.Header>
      <Row className="pb-2">
        <div>
          <div className="avatar-wrapper">
            <Image src={userInfo.avatar} alt="" roundedCircle />
            <span className="status"></span>
          </div>
        </div>
        <Col xs="5" className="username-wrapper mt-auto pl-1 text-left">
          <p className="pb-2">{userInfo.username}</p>
        </Col>

        <Col className="options-wrapper my-auto text-left">
          <Row className="justify-content-around">
            <Button>
              <FontAwesomeIcon icon={faUserPlus} onClick={handleAFWShow} />
            </Button>
            <Button>
              <FontAwesomeIcon icon={faCog} onClick={handleSWShow} />
            </Button>
            <Link to="/logout" className="btn-link">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </Row>
        </Col>
      </Row>
      <Row>
        <div className="searchbar-wrapper">
          <Form.Control
            id="searchInput"
            placeholder="Search"
            className="search-input w-100"
          />
          <div className="searchbar-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </Row>
      {renderTabs()}
    </Card.Header>
  );

  const renderBody = () => (
    <Card.Body className="p-0 contact-list text-left">
      {selectedTab === "chats" ? renderChatsTab() : renderFriendsTab()}
    </Card.Body>
  );

  const renderTabs = () => (
    <Nav
      className="nav-justified mt-1"
      variant="tabs"
      defaultActiveKey={selectedTab}
    >
      <Nav.Item>
        <Nav.Link
          onSelect={() => {
            setSelectedTab("chats");
          }}
          eventKey="chats"
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onSelect={() => {
            setSelectedTab("friends");
          }}
          eventKey="friends"
        >
          <FontAwesomeIcon icon={faUsers} />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );

  const renderChatsTab = () => {
    return (
      <div className="tab">
        {lastMessages.length > 0 &&
          processLastMessages().map((info) => {
            return (
              info.username && (
                <Button
                  onClick={() => {
                    onClickChat(info.userId);
                  }}
                  key={info._id}
                  className="contact w-100"
                >
                  <Row>
                    <Col xs="3">
                      <div className="avatar-wrapper">
                        <Image
                          src={getAvatar(info.userId)}
                          alt=""
                          roundedCircle
                        />
                        <span className="status"></span>
                      </div>
                    </Col>
                    <Col
                      sm="6"
                      className="text-left username-wrapper mt-auto pl-0"
                    >
                      <span className="font-weight-bold">{info.username}</span>
                      <p className="last-message text-truncate">
                        {info.message}
                      </p>
                    </Col>
                    <Col
                      sm="3"
                      className="time-wrapper mt-auto text-right pl-2"
                    >
                      <span className="message-time">{info.time}</span>
                      <p className="unread-messages">
                        {/* <Badge variant="dark">1</Badge> */}
                      </p>
                    </Col>
                  </Row>
                </Button>
              )
            );
          })}
      </div>
    );
  };

  const renderFriendsTab = () => {
    return (
      <div className="tab">
        <Button className="contact w-100">
          <Row>
            <Col xs="3">
              <div className="avatar-wrapper">
                <Image src={userInfo.avatar} alt="" roundedCircle />
                <span className="status"></span>
              </div>
            </Col>
            <Col className="username-wrapper mt-auto pl-0 text-left">
              <span className="font-weight-bold">
                {userInfo.username + " (Me)"}
              </span>
              <p>{userInfo.email}</p>
            </Col>
          </Row>
        </Button>
        {friends.length > 0
          ? friends.map((f) => (
              <Button
                key={f.friend._id}
                id={f.friend._id}
                value={f.friend._id}
                className="contact w-100"
                onClick={() => {
                  onClickSelectFriend(f);
                }}
              >
                <Row>
                  <Col xs="3">
                    <div className="avatar-wrapper">
                      <Image src={f.friend.avatar} alt="" roundedCircle />
                      <span className="status"></span>
                    </div>
                  </Col>
                  <Col className="username-wrapper mt-auto pl-0 text-left">
                    <span className="font-weight-bold">
                      {f.friend.username}
                    </span>
                    <p>{f.friend.email}</p>
                  </Col>
                  {f.status === "requested" && (
                    <Col xs="1" className="friend-status-wrapper text-left">
                      <Badge variant="dark">Pending</Badge>
                    </Col>
                  )}
                  {f.status === "pending" && (
                    <Col xs="1" className="friend-status-wrapper text-left">
                      <Badge variant="danger">Request</Badge>
                    </Col>
                  )}
                </Row>
              </Button>
            ))
          : null}
      </div>
    );
  };

  return (
    <div>
      <div className="text-center contact-list-window">
        <AddFriendWrapper
          friends={friends}
          show={AFWshow}
          handleClose={handleAFWClose}
          handleAddFriend={handleAddFriend}
          handleCancelFriend={handleCancelFriend}
        />
        <SettingsWrapper show={SWshow} handleClose={handleSWClose} />
        <Card>
          {renderHeader()}
          {renderBody()}
        </Card>
      </div>
    </div>
  );
};

ContactList.propTypes = {
  lastMessages: PropTypes.array,
  friends: PropTypes.array,
  handleSelectFriend: PropTypes.func,
  handleAddFriend: PropTypes.func,
  handleCancelFriend: PropTypes.func,
};

export default React.memo(ContactList);

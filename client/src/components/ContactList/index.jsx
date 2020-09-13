import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Card, Badge, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faUserPlus,
  faCog,
  faSignOutAlt,
  faCommentDots,
  faUsers,
  faPhone,
  faVideo,
  faEllipsisV,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const ContactList = ({ friends, handleSelectFriend }) => {
  const [selectedTab, setSelectedTab] = useState("chats");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const onClickSelectFriend = (f) => {
    handleSelectFriend(f);
  };

  const renderChatsTab = () => {
    return (
      <div className="tab mt-3">
        <Button className="contact w-100">
          <Row>
            <Col xs="3">
              <div className="avatar-wrapper">
                <img src={userInfo.avatar} alt="" />
                <span className="status"></span>
              </div>
            </Col>
            <Col xs="6" className="text-left username-wrapper mt-auto px-2">
              <span className="font-weight-bold">FriendCord</span>
              <p className="last-message text-truncate">...</p>
            </Col>
            <Col xs="3" className="time-wrapper mt-auto text-right pl-2">
              <span className="message-time">6:17AM</span>
              <p className="unread-messages">
                <Badge variant="dark">1</Badge>
              </p>
            </Col>
          </Row>
        </Button>
      </div>
    );
  };

  const renderFriendsTab = () => {
    return (
      <div className="tab mt-3">
        <Button className="contact w-100">
          <Row>
            <Col xs="3">
              <div className="avatar-wrapper">
                <img src={userInfo.avatar} alt="" />
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
                      <img src={f.friend.avatar} alt="" />
                      <span className="status"></span>
                    </div>
                  </Col>
                  <Col className="username-wrapper mt-auto pl-0 text-left">
                    <span className="font-weight-bold">
                      {f.friend.username}
                    </span>
                    <p>{f.friend.email}</p>
                  </Col>
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
        <Card>
          <Card.Header>
            <Row className="pb-2">
              <Col xs="3">
                <div className="avatar-wrapper">
                  <img src={userInfo.avatar} alt="" />
                  <span className="status"></span>
                </div>
              </Col>
              <Col xs="5" className="username-wrapper mt-auto pl-1 text-left">
                <p className="pb-2">{userInfo.username}</p>
              </Col>

              <Col className="options-wrapper my-auto text-left">
                <Row className="justify-content-around">
                  <Button>
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Button>
                  <Button>
                    <FontAwesomeIcon icon={faCog} />
                  </Button>
                  <Button>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </Button>
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
          </Card.Header>
          <Card.Body className="p-0 contact-list text-left">
            <Nav
              className="nav-justified"
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
            {selectedTab === "chats" ? renderChatsTab() : renderFriendsTab()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(ContactList);

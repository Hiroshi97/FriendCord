import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

const MessageCard = ({ text, sender, avatar }) => {
  const renderSender = () => (
    <Row className="justify-content-start">
      <div className="message-card-send">
        <p>{text}</p>
      </div>
      <div className="avatar-wrapper">
        <img src={avatar} alt="" />
      </div>
    </Row>
  );

  const renderReceiver = () => (
    <Row className={"justify-content-end"}>
      <div className="avatar-wrapper">
        <img src={avatar} alt="" />
      </div>
      <div className="message-card-receive">
        <p>{text}</p>
      </div>
    </Row>
  );

  return <>{sender ? renderSender() : renderReceiver()}</>;
}


MessageCard.propTypes = {
  text: PropTypes.string,
  sender: PropTypes.bool,
  avatar: PropTypes.string
};

export default React.memo(MessageCard);
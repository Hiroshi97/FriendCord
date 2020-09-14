import React from "react";
import { Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const MessageCard = ({ text, sender, avatar, messageTime }) => {

  const getMessageTime = () => {
    let today = new Date().toISOString().slice(0, 10).split("-").reverse();
    // let date = new Date(new Date(messageTime).toLocaleString("en-US", {timeZone: "Australia/Melbourne"})).toISOString();
    let date = messageTime.slice(0, 10).split("-").reverse();
    let time = messageTime.slice(11, 19).split(":").slice(0,2).join(":");
    if (today.join(" ") === date.join(" "))
    {
      return "Today at " + time;   
    } 

    date = new Date(messageTime).toUTCString().split(" ").slice(0, 4).join(" ");
    return date + " at " + time; 
  }

  const renderSender = () => (
    <Row className="justify-content-start">
      <OverlayTrigger
        placement="left"
        delay={{ show: 150 }}
        overlay={
          <Tooltip id={`tooltip-left`}>
            {getMessageTime()}
          </Tooltip>
        }
      >
        <div className="message-card-send">
          <p>{text}</p>
        </div>
      </OverlayTrigger>

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
      <OverlayTrigger
        placement="right"
        delay={{ show: 150 }}
        overlay={
          <Tooltip id={`tooltip-right`}>
            {getMessageTime()}
          </Tooltip>
        }
      >
        <div className="message-card-receive">
          <p>{text}</p>
        </div>
      </OverlayTrigger>
    </Row>
  );

  return <>{sender ? renderSender() : renderReceiver()}</>;
};

MessageCard.propTypes = {
  text: PropTypes.string,
  sender: PropTypes.bool,
  avatar: PropTypes.string,
  time: PropTypes.string,
};

export default React.memo(MessageCard);

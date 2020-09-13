import React, { useCallback, useEffect,  useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import "./chat.scss";
import axios from "axios";
import { getMessages, postMessage } from "../../actions/chats.action";
import ContactList from "../../components/ContactList";
import ChatWindow from "../../components/ChatWindow";

const ENDPOINT = "localhost:8000";

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatsState.messages);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends")) || []
  );
  const [messageInput, setMessageInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(friends[0] || "");
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    if (selectedFriend) {
      axios
        .post(`chats/getMessages`, {
          id1: userInfo.auth_id,
          id2: selectedFriend.friend._id,
        })
        .then((response) => {
          dispatch(getMessages([...response.data.messages]));
        });

      socket.on("message", (data) => {
        console.log(data);
        dispatch(postMessage(data));
      });
    }
  }, [messageInput, selectedFriend]);

  const handleSelectFriend = useCallback((friend) => {
    setSelectedFriend(friend);
  });

  const handleSubmitChatMessage = useCallback((e) => {
    e.preventDefault();
    socket.emit("message", {
      from: userInfo.auth_id,
      to: selectedFriend._id,
      message: e.target.messageInput.value,
    });
    e.target.messageInput.value = "";
    setMessageInput("");
  });

  return (
    <Container className="chat-page" fluid={true}>
      <Row className="chat-content text-white">
        <ContactList
          userInfo={userInfo}
          friends={friends}
          handleSelectFriend={handleSelectFriend}
        />
        <ChatWindow
          selectedFriend={selectedFriend}
          handleSubmitChatMessage={handleSubmitChatMessage}
          messages={messages}
        />
      </Row>
    </Container>
  );
}

export default React.memo(Chat);

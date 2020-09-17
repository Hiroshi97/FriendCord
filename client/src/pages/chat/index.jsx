import React, { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import "./chat.scss";
import axios from "axios";
import { getMessages, postMessage } from "../../actions/chats.action";
import ContactList from "../../components/ContactList";
import ChatWindow from "../../components/ChatWindow";

const ENDPOINT = process.env.REACT_APP_ENDPOINT || "localhost:8000";

function Chat() {
  const socket = socketIOClient(ENDPOINT);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends")) || []
  );
  const [messageInput, setMessageInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(
    friends.length > 0 ? friends[0] : null
  );
  const messages = useSelector((state) => state.chatsState.messages);

  useEffect(() => {
    if (selectedFriend) {
      axios
        .post(
          `chats/getMessages`,
          {
            id1: userInfo.auth_id,
            id2: selectedFriend.friend._id,
          },
          {
            headers: {
              authorization: userInfo.auth_id + userInfo.auth_id.slice(-3),
            },
          }
        )
        .then((response) => {
          dispatch(getMessages([...response.data.messages]));
        });

      socket.on("receiveMsg", (data) => {
        if ((selectedFriend._id === data.from && userInfo.auth_id === data.to) || (selectedFriend._id === data.to && userInfo.auth_id === data.from))
          dispatch(postMessage(data));
      });
    }

    return () => socket.disconnect();
  }, [messageInput, selectedFriend]);

  useEffect(() => {
    socket.on("updateFriend", (data) => {
      axios
        .post("user/friends", { username: userInfo.username })
        .then((res) => {
          localStorage.setItem("friends", JSON.stringify(res.data.friendships));
          setFriends([...res.data.friendships]);
        });
    });
  });

  const handleAddFriend = useCallback((id1, id2) => {
    socket.emit("addFriend", { id1, id2 });
    setMessageInput("");
  });

  const handleCancelFriend = useCallback((id1, id2) => {
    socket.emit("cancelFriend", { id1, id2 });
    setMessageInput("");
    if (selectedFriend && selectedFriend._id === id2) setSelectedFriend(null);
  });

  const handleSelectFriend = useCallback((friend) => {
    setSelectedFriend(friend);
  });

  const handleSubmitChatMessage = useCallback((e) => {
    e.preventDefault();
    socket.emit("sendMsg", {
      from: userInfo.auth_id,
      to: selectedFriend.friend._id,
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
          handleAddFriend={handleAddFriend}
          handleCancelFriend={handleCancelFriend}
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

export default Chat;

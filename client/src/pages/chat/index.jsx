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
  const [lastMessages, setLastMessages] = useState([]);
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends")) || []
  );
  const [flag, setFlag] = useState(Math.random());
  const [selectedFriend, setSelectedFriend] = useState(
    friends.length > 0 ? friends[0] : null
  );
  const messages = useSelector((state) => state.chatsState.messages);
  //Sort friendlist
  friends.sort((f1, f2) => {
    if (f1.status === "pending" && f2.status === "accepted") return -1;
    if (f2.status === "pending" && f1.status === "accepted") return 1;
    if (f2.status === "pending" && f1.status === "requested") return -1;
    if (f1.status === "pending" && f2.status === "requested") return 1;
    if (f2.status === "requested" && f1.status === "accepted") return -1;
    if (f1.status === "requested" && f2.status === "accepted") return 1;
  });

  useEffect(() => {
    //Get messages with a specific user
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
        if (
          (selectedFriend._id === data.from && userInfo.auth_id === data.to) ||
          (selectedFriend._id === data.to && userInfo.auth_id === data.from)
        )
          dispatch(postMessage(data));
      });
    }

    return () => socket.disconnect();
  }, [selectedFriend]);

  useEffect(() => {
    //Get all last messages
    axios
      .post(
        `chats/getLastMessages`,
        {
          id: userInfo.auth_id,
        },
        {
          headers: {
            authorization: userInfo.auth_id + userInfo.auth_id.slice(-3),
          },
        }
      )
      .then((response) => {
        let lastMess = response.data.lastMessages;
        lastMess.sort((value1, value2) => {
          if (new Date(value1.time).getTime() < new Date(value2.time).getTime())
            return 1;
          if (new Date(value2.time).getTime() < new Date(value1.time).getTime())
            return -1;
        });
        setLastMessages([...lastMess]);
      });
  }, [flag]);


  useEffect(() => {
    //Update friendlist
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
    setFlag(Math.random());
  });

  const handleCancelFriend = useCallback((id1, id2) => {
    socket.emit("cancelFriend", { id1, id2 });
    setFlag(Math.random());
    if (selectedFriend && selectedFriend._id === id2) setSelectedFriend(null);
  });

  const handleSelectFriend = useCallback((friend) => {
    setSelectedFriend({ ...friend });
  });

  const handleSubmitChatMessage = (e) => {
    e.preventDefault();
    setFlag(Math.random());
    socket.emit("sendMsg", {
      from: userInfo.auth_id,
      to: selectedFriend.friend._id,
      message: e.target.messageInput.value,
    });
    e.target.messageInput.value = "";
    
  };

  return (
    <Container className="chat-page" fluid={true}>
      <Row className="chat-content text-white">
        <ContactList
          lastMessages={[...lastMessages]}
          userInfo={userInfo}
          friends={friends}
          handleSelectFriend={handleSelectFriend}
          handleAddFriend={handleAddFriend}
          handleCancelFriend={handleCancelFriend}
        />
        {selectedFriend && (
          <ChatWindow
            selectedFriend={{ ...selectedFriend }}
            handleSubmitChatMessage={handleSubmitChatMessage}
            messages={messages}
            handleAddFriend={handleAddFriend}
            handleCancelFriend={handleCancelFriend}
          />
        )}
      </Row>
    </Container>
  );
}

export default Chat;

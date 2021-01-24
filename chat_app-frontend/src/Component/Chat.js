import { IconButton } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "../Style/Chat.css";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Message from "./Message";
import { selectChatId, selectChatName } from "../features/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import axios from "../axios";
import { LOGOUT_USER, selectUser } from "../features/userSlice";
import Pusher from "pusher-js";
import Dropdown from "./Dropdown";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_CLIENT_ID, {
  cluster: "eu",
});

function Chat({ openUpload, setOpenUpload }) {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const [messages, setMessages] = useState([]);
  const chatId = useSelector(selectChatId);
  let chatMessages = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    //quando viene selezionata la chat
    //recupera i dati dal db di quella chat
    const getConversation = async (chatId) => {
      if (chatId) {
        await axios
          .get(`/api/chat/get/conversation?id=${chatId}`)
          .then(async (res) => {
            setMessages(res.data[0].conversation);
          })
          .catch((err) => {
            console.log(`LOG ERROR => ${err}`);
          });
      }
    };

    //evito di subscribe più volte ogni volta che cambio la chat
    pusher.unsubscribe("messages");
    getConversation(chatId);

    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function (data) {
      getConversation(chatId);
    });
  }, [chatId]);

  //ogni volta che si cambia chat sposto il focus
  useEffect(() => {
    goToBot();
  }, [messages]);

  //sposta il focus con scroll su ultima riga del div
  const goToBot = () => {
    console.log(chatMessages);
    chatMessages.scrollTop =
      chatMessages.scrollHeight - chatMessages.clientHeight;
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const sendUser = {
      displayName: user.displayName,
      email: user.email,
      photo: user.photo,
      uid: user.uid,
    };

    axios.post(`/api/chat/new/message?id=${chatId}`, {
      message: input,
      timestamp: Date.now(),
      user: sendUser,
    });

    setInput("");
  };

  return (
    <div className="chat">
      {/** chat Nav */}
      <div className="chat__header">
        <h4>
          A: <span className="chat__name">{chatName}</span>
        </h4>
        <div className="chat__headerRight">
          <Dropdown
            openUpload={openUpload}
            setOpenUpload={setOpenUpload}
          ></Dropdown>
          <strong
            onClick={() => {
              dispatch(LOGOUT_USER());
            }}
            className="chat__logout"
          >
            <b>Logout</b>
          </strong>
        </div>
      </div>
      {/** chat body message */}
      <div
        className="chat__messages"
        ref={(el) => {
          chatMessages = el;
        }}
      >
        <FlipMove>
          {messages.map(({ user, _id, message, timestamp }) => (
            <Message
              key={_id}
              id={_id}
              sender={user}
              message={message}
              timestamp={timestamp}
            />
          ))}
        </FlipMove>
      </div>
      {/** chat input message */}
      <div className="chat__input">
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="invia un messaggio..."
            type="text"
          />
        </form>
        <IconButton onClick={sendMessage}>
          <SendRoundedIcon></SendRoundedIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

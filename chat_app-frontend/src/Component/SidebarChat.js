import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../Style/SidebarChat.css";
import { setChat } from "../features/chatSlice";
import * as timeago from "timeago.js";
import axios from "../axios";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_CLIENT_ID, {
  cluster: "eu",
});

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  const [lastMsg, setLastMsg] = useState("");
  const [lastPhoto, setLastPhoto] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState("");

  const getSidebarElement = async () => {
    await axios.get(`/api/chat/get/lastMessage?id=${id}`).then((res) => {
      setLastMsg(res.data.message);
      setLastPhoto(res.data.user.photo);
      setLastTimestamp(res.data.timestamp);
    });
  };

  useEffect(() => {
    getSidebarElement();

    //eseguo subscribe con pusher al canale ''messages''
    //ogni nuovo messaggio che si ha esegue nuovamente la funzione getSidebarElement()
    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function (data) {
      getSidebarElement();
    });
  }, [id]);

  let utc = new Date(parseInt(lastTimestamp)).toUTCString();
  let data = new Date(utc);


  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar src={lastPhoto} />
      <div className="sidebarChat__info">
        <h3>
          {chatName.length > 15 ? chatName.substr(0, 14) + "..." : chatName}
        </h3>
        <p>{lastMsg.length > 45 ? lastMsg.substr(0, 44) + "..." : lastMsg}</p>
        <small className="sidebarChat__data">
          <span className="data__xl">
            {/* {new Date(parseInt(lastTimestamp)).toUTCString()} */}
            {`${data
              .toLocaleDateString("it-IT", { weekday: "short" })
              .toUpperCase()} , ${data.getDate()}/${
              data.getMonth() + 1
            }/${data.getFullYear()} - ${data.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </span>
          {/* gg/mm/yy - hh.mm => */}
          <span className="data__sm">
            {`${data.getDate()}/${
              data.getMonth() + 1
            }/${data.getFullYear()} - ${data.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </span>
          {/* {`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`} */}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;

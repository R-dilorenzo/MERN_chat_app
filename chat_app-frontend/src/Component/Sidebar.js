import React, { useEffect, useState } from "react";
import "../Style/Sidebar.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutLinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "../axios";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_CLIENT_ID, {
  cluster: "eu",
});

/**
 * User:
 *  photo
 *  id
 *  email
 *  name
 */

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [filterName, setFilterName] = useState("");

  const getChats = async () => {
    await axios
      .get("/api/chat/get/conversationList")
      .then((res) => {
        console.log(res.data);
        setChats(res.data);

        for (var property in chats) {
          console.log(`${property} = ${chats[property]}`);
        }
        console.log(chats);
        console.log(`chat => ${chats}`);
      })
      .catch((err) => {
        console.log(`LOG ERROR => ${err}`);
      });
  };

  useEffect(() => {
    //recupera dal db le chat
    getChats();

    const channel = pusher.subscribe("chats");
    channel.bind("newChat", function (data) {
      getChats();
    });
  }, []);

  const addChat = (e) => {
    e.preventDefault();

    const chatName = prompt("Inserisci il nome della chat");
    const firstMsg = prompt("Inserisci un messaggio di benvenuto...");

    const sendUser = {
      displayName: user.displayName,
      email: user.email,
      photo: user.photo,
      uid: user.uid,
    };

    if (chatName && firstMsg) {
      let chatId = "";

      axios
        .post("/api/chat/new/conversation", {
          chatName: chatName,
        })
        .then((res) => {
          chatId = res.data._id;
        })
        .then(() => {
          axios.post(`/api/chat/new/message?id=${chatId}`, {
            message: firstMsg,
            timestamp: Date.now(),
            user: sendUser,
          });
        });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photo} className="sidebar__avatar" />
        <div className="sidebar__input">
          <SearchIcon />
          <input
            placeholder="Cerca una chat"
            onChange={(e) => {
              setFilterName(e.target.value);
            }}
          ></input>
        </div>
        <Button onClick={addChat} endIcon={<RateReviewOutLinedIcon />}>
          <b>Nuova chat</b>
        </Button>
      </div>
      <div className="sidebar__chats">
        {filterName.length != ""
          ? chats
              .filter(
                (item) =>
                  JSON.stringify(item.name)
                    .toLowerCase()
                    .indexOf(filterName.toLowerCase()) !== -1
              )
              .map(({ id, name, timestamp }) => (
                <SidebarChat
                  key={id}
                  id={id}
                  chatName={name}
                  timestamp={timestamp}
                ></SidebarChat>
              ))
          : chats.map(({ id, name, timestamp }) => (
              <SidebarChat
                key={id}
                id={id}
                chatName={name}
                timestamp={timestamp}
              ></SidebarChat>
            ))}
        {/* {chats.map(({ id, name, timestamp }) =>(
                    <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp}></SidebarChat>
                ))} */}
      </div>
    </div>
  );
}

export default Sidebar;

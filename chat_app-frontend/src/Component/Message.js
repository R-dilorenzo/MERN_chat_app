import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import "../Style/Message.css";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Message = forwardRef(({ id, sender, message, timestamp }, ref) => {
  const user = useSelector(selectUser);

  // sender => user.db
  // user => user.Redux
  return (
    <div
      ref={ref}
      className={`message ${user.email === sender.email && "message__sender"}`}
    >
      <Avatar className="message__photo" src={sender.photo} />
      <small className="message__name">~ {sender.displayName}</small>
      <p>{message}</p>
      <small>
        {new Date(parseInt(timestamp)).toLocaleDateString()}{" "}
        {new Date(parseInt(timestamp)).toLocaleTimeString()}
      </small>
    </div>
  );
});

export default Message;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import axios from "../axios";
import Chat from "../Component/Chat";
import DialogNotifica from "../Component/DialogNotifica";
import DialogUpload from "../Component/DialogUpload";
import Sidebar from "../Component/Sidebar";
import {
  LOGIN_USER,
  LOGOUT_USER,
  selectDialog,
  selectUser,
} from "../features/userSlice";
import "./ChatPage.css";
import Login from "./Login";

function ChatPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const openDialogUpload = useSelector(selectDialog);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.photo == "") {
        setDialog(true);
      }
    } else {
      dispatch(LOGOUT_USER());
    }
  }, []);

  return (
    <div className="chatPage">
      {dialog ? (
        <DialogNotifica open={dialog} setOpen={setDialog}></DialogNotifica>
      ) : (
        <></>
      )}
      {openDialogUpload ? <DialogUpload></DialogUpload> : <></>}
      {user ? (
        <>
          <Sidebar></Sidebar>
          <Chat></Chat>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
}

export default ChatPage;

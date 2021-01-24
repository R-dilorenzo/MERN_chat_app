import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Avatar from "../img/avatar.svg";
import { useDispatch } from "react-redux";
import { SET_UPLOAD_TRUE } from "../features/userSlice";
import NavButton from "../Style/NavButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogNotifica({ open, setOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateFoto = () => {
    handleClose();

    dispatch(SET_UPLOAD_TRUE());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img style={{ maxWidth: "10vw", maxHeight: "15vh" }} src={Avatar}></img>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <strong>Non hai ancora inserito una foto per il profilo.</strong>
          <p>Aggiorna ora?</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Non ora</Button>
        <NavButton onClick={UpdateFoto}>Aggiorna Ora</NavButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogNotifica;

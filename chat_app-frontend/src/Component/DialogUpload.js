import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CropImage from "./CropImage";
import { withStyles } from "@material-ui/core";
import { styles } from "../Style/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectDialog, SET_UPLOAD_FALSE } from "../features/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogUpload = withStyles(styles)(CropImage);

function DialogUpload() {
  const [imageSrc, setImageSrc] = useState(null);
  const [maxWidth, setMaxWidth] = useState("xl");
  const [fullWidth, setFullWidth] = useState(true);
  const opendDialogUpload = useSelector(selectDialog);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(SET_UPLOAD_FALSE());
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={opendDialogUpload}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <StyledDialogUpload
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
        ></StyledDialogUpload>
      </DialogContent>
      {imageSrc ? (
        <DialogActions>
          <Button
            onClick={() => {
              setImageSrc(null);
            }}
            color="primary"
          >
            Rimuovi Immagine
          </Button>
        </DialogActions>
      ) : (
        <></>
      )}
    </Dialog>
  );
}

export default DialogUpload;

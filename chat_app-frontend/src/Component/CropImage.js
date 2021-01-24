import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import { styles } from "../Style/styles";
import NavButton from "../Style/NavButton";
import axios from "../axios";
import {
  LOGIN_USER,
  selectUser,
  SET_UPLOAD_FALSE,
} from "../features/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

function CropImage({ imageSrc, setImageSrc, classes }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const user = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const url = `${croppedImage}`;
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        const file = new File([res], "myImage.jpeg", { type: "image/jpeg" });
        console.log(file);
        setFile(file);
        // FORMDATA:
        // First argument is a field
        // Second argument  can take Buffer or Stream (lazily read during the request) too.
        // Third argument is filename
        const formData = new FormData();
        formData.append("_id", user.uid); //passo uid in req.body
        formData.append("myImage", file); //passo il file in req.file
        console.log(formData);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios
          .post("/api/user/upload", formData, config)
          .then((response) => {
            // console.log(`RESPONSE --> ${response}`)
            const pathToUpload = "/public/uploads/";
            const path = `${pathToUpload}${response.data}`;
            axios.post(`/api/chat/setPhoto/conversation?uid=${user.uid}`, {
              photo: path,
            });
            axios.post(`/api/user/setPhoto/user?_id=${user.uid}`, {
              photo: path,
            });

            dispatch(
              LOGIN_USER({
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: path,
              })
            );
          })
          .catch((error) => {
            console.log(`ERROR --> ${error}`);
          });
      });
    setImageSrc(null);
    dispatch(SET_UPLOAD_FALSE());
    setFile(null);
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              cropShape="round"
              aspect={1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ container: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>
          {croppedImage ? (
            <div className="chat__dialogDiv">
              <h2>Crop image:</h2>
              <img src={croppedImage}></img>
              <NavButton onClick={handleUpload}>Upload</NavButton>
            </div>
          ) : (
            <></>
          )}
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  );
}

export default CropImage;

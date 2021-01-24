import React from "react";
import "../Style/Nav.css";
import logo from "../img/logo.png";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BackupIcon from "@material-ui/icons/Backup";
import SettingsIcon from "@material-ui/icons/Settings";
import NavButton from "../Style/NavButton";
import { Button } from "@material-ui/core";
import { LOGOUT_USER, SET_UPLOAD_TRUE } from "../features/userSlice";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#284b6e",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Dropdown() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const OpenUpload = () => {
    dispatch(SET_UPLOAD_TRUE());
  };

  return (
    <div className="nav__hamburger">
      <Button onClick={handleClick}>
        <SettingsIcon></SettingsIcon>
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={OpenUpload}>
          <ListItemIcon>
            <BackupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Upload Avatar" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            dispatch(LOGOUT_USER());
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logot" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default Dropdown;

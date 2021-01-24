import React from "react";
import "../Style/Nav.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { createMuiTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import NavButton from "../Style/NavButton";

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

function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav">
      <Link className="nav__link" to="/">
        <img className="nav__logo" src={logo} alt="Square Chat"></img>
      </Link>
      <div className="nav__hamburger">
        <NavButton onClick={handleClick}>
          <MenuIcon></MenuIcon>
        </NavButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <Link className="nav__link" to="/">
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link className="nav__link" to="/login">
              <ListItemIcon>
                <LockOpenIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link className="nav__link" to="/registrazione">
              <ListItemIcon>
                <HowToRegIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Registrazione" />
            </Link>
          </StyledMenuItem>
        </StyledMenu>
      </div>
    </div>
  );
}

export default Nav;

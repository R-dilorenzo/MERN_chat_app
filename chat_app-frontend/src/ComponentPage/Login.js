import React, { useState } from "react";
import "./Registrazione.css";
import axios from "../axios";
import Wave from "../img/Wave.svg";
import Bg from "../img/bg.svg";
import Avatar from "../img/avatar.svg";
import InputAuth from "../Component/InputAuth";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../features/userSlice";
import { useAlert } from "react-alert";
import Nav from "../Component/Nav";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const sendLogin = (e) => {
    //e.preventDefault();

    axios
      .post(`/api/user/login`, {
        email: email,
        password: password,
      })
      .then(async (res) => {
        // ottenuto il token con la post
        let axiosConfig = {
          headers: {
            "auth-token": `${res.data}`,
          },
        };
        // effettuo una get con header per ottenere utente
        await axios.get(`/api/chat/`, axiosConfig).then((res) => {
          dispatch(
            LOGIN_USER({
              displayName: res.data.name,
              email: res.data.email,
              uid: res.data._id,
              photo: res.data.photo,
            })
          );

          history.push("/chat");
          setEmail("");
          setPassword("");
        });
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
        alert.error("Email/Password non corretti!"); // => useAlert().error definito sopra
      });
  };

  const regexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const submit = (e) => {
    e.preventDefault();
    if (password.length < 6 || !regexEmail.test(email)) {
      return;
    } else {
      sendLogin();
    }
  };

  return (
    <div className="auth">
      <Nav></Nav>
      <img className="wave" src={Wave} />
      <div className="container">
        <div className="img">
          <img src={Bg} alt="background_img" />
        </div>
        <div className="login-content">
          <form onSubmit={submit}>
            <img src={Avatar} />
            <h2 className="title" style={{ marginBottom: "25px" }}>
              LOGIN
            </h2>
            <InputAuth
              value={"Email"}
              stateProps={email}
              setStateProps={setEmail}
              icon={<MailIcon />}
            ></InputAuth>
            <InputAuth
              value={"Password"}
              stateProps={password}
              setStateProps={setPassword}
              password
              icon={<LockIcon />}
            ></InputAuth>
            <Link to="/registrazione">
              <span className="link">Non hai un account?</span>
            </Link>
            <button className="btn">ACCEDI</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./Registrazione.css";
import axios from "../axios";
import Wave from "../img/Wave.svg";
import Bg from "../img/profile.svg";
import Avatar from "../img/avatar.svg";
import InputAuth from "../Component/InputAuth";
import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Nav from "../Component/Nav";

function Autenticazione() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const alert = useAlert();

  const sendRegistazione = (e) => {
    //e.preventDefault();

    axios
      .post(`/api/user/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        history.push("/login");
        alert.success("Registrazione effettuata!\nEsegui il login"); // => useAlert().success definito sopra

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        history.push("/login");
        alert.error("Email già presente!"); // => useAlert().error definito sopra
      });
  };

  const regexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const submit = (e) => {
    e.preventDefault();
    if (name.length < 3 || password.length < 6 || !regexEmail.test(email)) {
      return;
    } else {
      sendRegistazione();
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
              Registrazione
            </h2>
            <InputAuth
              value={"Nome"}
              stateProps={name}
              setStateProps={setName}
              icon={<PersonIcon />}
            ></InputAuth>
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
            <Link to="/login">
              <span className="link">Hai già un account?</span>
            </Link>
            <button className="btn">REGISTRATI</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Autenticazione;

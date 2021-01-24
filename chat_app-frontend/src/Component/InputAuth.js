import React, { useRef, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function InputAuth({ value, stateProps, setStateProps, password, icon }) {
  const [inputError, setInputError] = useState("");
  const [hidePsw, setHidePsw] = useState(true);

  const divRef = useRef();
  const regexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  const addFocus = () => {
    divRef.current.classList.add("focus");
  };

  const loseFocus = () => {
    if (value == "Nome") {
      if (stateProps?.length < 3) {
        setInputError(`ERRORE: ${value} deve essere almeno di 3 caratteri`);
      } else {
        setInputError("");
      }
    }
    if (value == "Password") {
      if (stateProps?.length < 6) {
        setInputError(`ERRORE: ${value} deve essere almeno di 6 caratteri`);
      } else {
        setInputError("");
      }
    }
    if (value == "Email") {
      if (stateProps?.length < 6 || !regexEmail.test(stateProps)) {
        setInputError(`ERRORE: Formato ${value} non corretto`);
      } else {
        setInputError("");
      }
    }
    if (stateProps == "") {
      divRef.current.classList.remove("focus");
      setInputError("");
    }
  };

  return (
    <div className="input-div one" ref={divRef}>
      <div className="i">{icon}</div>
      <div className="div">
        <h5>
          {value}{" "}
          <span className="error">
            {" "}
            {!inputError ? "" : `- ${inputError}`}{" "}
          </span>{" "}
        </h5>
        <input
          onChange={(e) => setStateProps(e.target.value)}
          type={password ? (hidePsw ? "password" : "text") : "text"}
          onFocus={addFocus}
          onBlur={loseFocus}
          id="inputText"
        />
      </div>
      {password ? (
        <span
          style={
            stateProps.length > 0 ? { display: "flex" } : { display: "none" }
          }
          className="i"
          id="hidePsw"
          onClick={() => {
            setHidePsw(!hidePsw);
          }}
        >
          {hidePsw ? (
            <VisibilityOffIcon></VisibilityOffIcon>
          ) : (
            <VisibilityIcon></VisibilityIcon>
          )}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InputAuth;

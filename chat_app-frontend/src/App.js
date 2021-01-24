import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./ComponentPage/Home";
import Registrazione from "./ComponentPage/Registrazione";
import Login from "./ComponentPage/Login";
import ChatPage from "./ComponentPage/ChatPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/chat">
            <ChatPage></ChatPage>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/registrazione">
            <Registrazione></Registrazione>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

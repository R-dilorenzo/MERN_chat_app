import React, { useEffect, useRef } from "react";
import "./Home.css";
import HomeLogo from "../img/HomeLogo.js";
import styled from "styled-components";
import HomeButton from "../Style/HomeButton";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import { TweenMax, Power3, TimelineLite } from "gsap";
import { duration } from "@material-ui/core";

function Home() {
  let logoItem = useRef(null);
  let home = useRef(null);

  //creo una nuova TimeLine
  let tl = new TimelineLite({ delay: 0.5 });

  useEffect(() => {
    //GSAP VAR
    const logo = document.getElementById("Logo");
    const message = document.getElementById("MessButton");
    const line1 = document.getElementById("Line1");
    const line2 = document.getElementById("Line2");
    const bullet1 = document.getElementById("bullet1");
    const bullet2 = document.getElementById("bullet2");
    const bullet3 = document.getElementById("bullet3");

    //setto prima la sezione home to hidden e tramite gsap rendo visibile la sezione
    //facendo partire le animazioni e visualizzare gli elementi solo quando sono tutti caricati
    TweenMax.to(home, 0, { css: { visibility: "visible" } });

    //sincronizzo le timeline con 'Start' in modo che partano allo stesso momento
    tl.from(line1.children, { scaleX: 0, duration: 1 }, "Start")
      .from(line2.children, { scaleX: 0, duration: 1.5 })
      .to(message, {
        scale: 1.2,
        transformOrigin: "center",
        ease: Power3.easeInOut,
        duration: 0.5,
      })
      .to(message, { scale: 1, ease: Power3.easeInOut, duration: 0.2 })
      //repeat con yoyo => yoyo true esegue animazione al reverse (torna allo stato iniaiziale)
      .to(logo, {
        scale: 1.2,
        transformOrigin: "center",
        ease: Power3.easeInOut,
        repeat: 3,
        yoyo: true,
        duration: 0.5,
        delay: 0.4,
      });

    tl.staggerFrom(
      [bullet1, bullet2, bullet3],
      0.3,
      {
        opacity: 0,
        delay: 0.2,
        repeat: 4,
        yoyo: true,
      },
      0.15,
      "Start"
    );
  }, []);

  return (
    <div
      className="home"
      ref={(el) => {
        home = el;
      }}
      style={{ visibility: "hidden" }}
    >
      <Nav></Nav>
      <div
        className="home__logo"
        ref={(el) => {
          logoItem = el;
        }}
      >
        <HomeLogo></HomeLogo>
      </div>
      <Link className="home__link" to="/login">
        <HomeButton login>Accedi</HomeButton>
      </Link>
      <Link className="home__link" to="/registrazione">
        <HomeButton>Registrati</HomeButton>
      </Link>
    </div>
  );
}

export default Home;

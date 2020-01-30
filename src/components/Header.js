import React from "react";
import style from "../styles/header.module.css";
import Search from "./Search";
import logo from "../img/logo.png";

function Header() {
  return (
    <div className="Header">
      <nav className="level">
        <div className={`level-item has-text-centered ${style.flex1}`}>
          <Search />
        </div>
        <div className={`level-item has-text-centered ${style.flex1}`}>
          <img src={logo} alt="m3tube" className={style.headerLogo} />
        </div>
        <div className={`level-item has-text-centered ${style.flex1}`}>
          <a
            href="https://github.com/m3alamin/m3tube"
            target="_blank"
            rel="noopener noreferrer"
          >
            fork on <i className={`fab fa-github ${style.black}`}></i>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Header;

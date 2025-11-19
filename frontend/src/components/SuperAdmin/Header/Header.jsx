// header.js
import React from 'react';
import './header.css';
import { IoMdMail } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";



const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="welcome">
          <span className="welcome-text">Welcome Back </span>
          <span className="welcome-icon">💫</span>
           <span className="welcome-text"></span>
        </div>
      </div>
      <div className="header-right">
        <div className="notification">
          <button className="notification-btn mail">
            <span className="icon"><IoMdMail /></span>
            <span className="badge">4</span>
          </button>
        </div>
        <div className="notification">
          <button className="notification-btn bell">
            <span className="icon"><IoNotificationsSharp /></span>
            <span className="badge">8</span>
          </button>
        </div>
        <div className="user-profile">
           <span className="icon2"><IoPersonCircleSharp /></span>
          <div className="user-info">
            <span className="user-name">Lakshita</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
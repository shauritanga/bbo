import React from "react";
import { FiMoon } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./header.css";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Icon from "../components/icon/Icon.jsx";

function Header({ user, theme, setTheme, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="header">
      <div className="logo">
        <HiOutlineMenuAlt2
          className="header-icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <h2>ALPHA CAPITAL</h2>
      </div>
      <div className="links">
        {theme === "light" ? (
          <MdOutlineDarkMode
            className="header-icon"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <MdOutlineLightMode
            className="header-icon"
            onClick={() => setTheme("light")}
          />
        )}
        <LuSearch className="header-icon" />
        <div className="notify">
          <IoMdNotificationsOutline className="header-icon" />
          <span>4</span>
        </div>
        <div className="user">
          <div className="user-name">
            <h3>{user.name}</h3>
            <span className="text-muted">
              {user.isadmin ? "Admin" : "Normal"}
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
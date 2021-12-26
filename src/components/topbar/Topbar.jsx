import React, { useContext, useEffect, useState } from "react";
import { Search, Notifications, Message } from "@mui/icons-material";
import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [text, setText] = useState();

  const handleChange = async () => {};

  return (
    <div className="topBar">
      <div className="topBar__left">
        <Link to="/">
          <div className="topBar__left-logo">Social</div>
        </Link>
      </div>
      <div className="topBar__center">
        <div className="topBar__center-searchBar">
          <Search className="topBar__center-searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post or video"
            className="topBar__center-searchInput"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="topBar__right">
        <Link to={"/profile/" + user.id}>
          <div className="topBar__right-user">
            <div className="user__img">
              <img
                src={user.avatar || PF + "/assets/person/noavatar.png"}
                className="user__img-config"
                alt=""
              />
            </div>
            <div className="user__name">{user.name}</div>
          </div>
        </Link>

        <div className="topBar__right-icon">
          <Link to="/messenger" style={{ color: "#fff" }}>
            <div className="topBar__right-iconItem">
              <Message />
              <span className="topBarIconBadge">1</span>
            </div>
          </Link>
          <div className="topBar__right-iconItem">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

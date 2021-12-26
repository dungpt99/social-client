import { RssFeed } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./sideBar.css";

export default function SideBar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sideBar">
      <ul className="sideBar__list">
        <li className="sideBar__list-item">
          <Link to={"/profile/" + user.id} style={{ width: "100%" }}>
            <div className="item__user">
              <div className="item__userImg">
                <img
                  src={user.avatar || PF + "/assets/person/noavatar.png"}
                  alt=""
                />
              </div>
              <div className="item__userName">{user.name}</div>
            </div>
          </Link>
        </li>
        <li className="sideBar__list-item">
          <RssFeed className="item__icon" />
          <span className="item__nameIcon">New feed</span>
        </li>
      </ul>
    </div>
  );
}

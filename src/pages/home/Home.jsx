import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import "./home.css";
import SideBar from "../../components/sideBar/SideBar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

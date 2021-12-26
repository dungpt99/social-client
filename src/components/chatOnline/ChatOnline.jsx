import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chatOnline.css";

export default function ChatOnline({ userId, setCurrentChat }) {
  const [friendOnline, setFriendOnline] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${PF}/user/` + userId);
        setFriendOnline(res.data);
      } catch (error) {}
    };
    getUser();
  }, [userId]);

  const handleClick = () => {
    const getConversation = async () => {
      const res = await axios.get(`${PF}/conversation/` + userId);
      setCurrentChat(res.data);
    };
    getConversation();
  };

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend" onClick={handleClick}>
        <div className="chatOnlineImgContainer">
          <img
            src={friendOnline?.avatar || PF + "/assets/person/noavatar.png"}
            alt=""
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">{friendOnline?.name}</div>
      </div>
    </div>
  );
}

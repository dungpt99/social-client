import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${PF}/conversation/user/` + conversation.id
        );
        const friend = res.data[0].users.find((m) => m.id !== currentUser.id);
        setUser(friend);
      } catch (error) {}
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <>
      <div className="conversation">
        <img
          src={user.avatar || PF + "/assets/person/noavatar.png"}
          alt=""
          className="conversationImg"
        />
        <div className="conversationName">{user.name}</div>
      </div>
    </>
  );
}

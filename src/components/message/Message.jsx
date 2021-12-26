import axios from "axios";
import { useEffect, useState } from "react";
import "./Message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${PF}/user/` + message.user.id);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (message) {
      getUser();
    }
  }, [message]);

  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="message__top">
          <img
            src={message ? PF + "/assets/person/noavatar.png" : ""}
            alt=""
            className="messageImg"
          />
          <div className="messageText">{message ? message.content : null}</div>
        </div>
        <div className="message__bottom">
          {message ? format(message.createdAt) : null}
        </div>
      </div>
    </>
  );
}

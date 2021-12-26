import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./rightBar.css";

export default function RightBar() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${PF}/user`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);

  return (
    <div className="rightBar">
      <div className="rightBar__title">People</div>
      <ul className="rightBar__friends">
        {friends.map((friend) => (
          <Link
            to={"/profile/" + friend.id}
            style={{ color: "#333" }}
            key={friend.id}
            user={friend}
          >
            <li className="rightBar__friend">
              <div className="rightBar__friendImg">
                <img
                  src={friend.avatar || PF + "/assets/person/noavatar.png"}
                  alt=""
                />
                <div className="rightBar__friendStatus"></div>
              </div>
              <span className="rightBar__friendName">{friend.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

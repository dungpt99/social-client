import { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";
import { useParams } from "react-router";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";

export default function Profile() {
  const [user, setUser] = useState({});
  const id = useParams().id;
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await axios.get(`${PF}/friend`);
        res.data.forEach((e) => {
          if (e.id === Number(id)) {
            setFollowed(true);
          }
        });
        console.log(followed);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriend();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${PF}/user/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  const handleClick = async () => {
    if (!followed) {
      try {
        const res = await axios.post(`${PF}/friend`, {
          follow: id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.delete(`${PF}/friend`, {
          data: { follow: user.id },
        });
      } catch (error) {
        console.log(error);
      }
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Topbar />
      <div className="profileWrapper">
        <div className="profile__user">
          <img
            className="profile__userCoverImg"
            src={user.coverImage || "/assets/person/cat.jpg"}
            alt=""
          />
          <div className="profile__userAvt">
            <img
              src={user.avatar || PF + "/assets/person/noavatar.png"}
              alt=""
            />
            <div className="profile__userName">{user.name}</div>
            {user.name !== currentUser.name && (
              <button className="profile__userFollow" onClick={handleClick}>
                {followed ? "Unfollow" : "follow"}
                {followed ? <Remove /> : <Add />}
              </button>
            )}
          </div>
        </div>
        <div className="profile__feed">
          <Feed userId={user.id} />
        </div>
      </div>
    </>
  );
}

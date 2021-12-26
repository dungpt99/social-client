import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./post.css";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(1);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${PF}/user/${post.user.id}`);
      setUser(res.data);
    }
    fetchData();
  }, [post.user.id]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${PF}/like/${post.id}`);
      setLike(res.data.length);
    }
    fetchData();
  }, [post.id]);

  const likeHandler = async () => {
    if (!isLiked) {
      try {
        const data = {
          postId: post.id,
        };
        await axios.post(`${PF}/like`, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = {
          postId: post.id,
        };
        await axios.delete(`${PF}/like`, { data });
      } catch (error) {
        console.log(error);
      }
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {};

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postWrapper__top">
          <div className="postWrapper__topLeft">
            <Link to={"/profile/" + user.id}>
              <img
                className="postWrapper__topLeft-userImg"
                alt=""
                src={user.avatar || PF + "/assets/person/noavatar.png"}
              />
            </Link>
            <div>
              <Link to={"/profile/" + user.id}>
                <div className="postWrapper__topLeft-username">{user.name}</div>
              </Link>

              <div className="postWrapper__topLeft-time">
                {format(post.createdAt)}
              </div>
            </div>
          </div>
          <div className="postWrapper__topRight">
            {user.id === currentUser.id && <MoreVert onClick={handleDelete} />}
          </div>
        </div>
        <div className="postWrapper__center">
          <div className="postWrapper__center-text">{post.desc}</div>
          <img
            src={PF + post.img || ""}
            alt=""
            className="postWrapper__center-img"
          />
        </div>
        <div className="postWrapper__bottom">
          <div className="postWrapper__bottom-left">
            <img src="/assets/post/heart.png" alt="" onClick={likeHandler} />
            <span className="left__likeCounter">{like} people liked it</span>
          </div>
          <div className="postWrapper__bottom-right">10 comments</div>
        </div>
      </div>
    </div>
  );
}

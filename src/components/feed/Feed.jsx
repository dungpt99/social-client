import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    async function fetchData() {
      const res = userId
        ? await axios.get(`${PF}/post/profile/` + userId)
        : await axios.get(`${PF}/post/timeline`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchData();
  }, [userId, status]);

  const changeStatus = (e) => {
    setStatus(e);
    setTimeout(setStatus(!e), 1000);
  };
  return (
    <div className="feed">
      {user.id === userId || userId === undefined ? (
        <Share changeStatus={changeStatus} />
      ) : null}
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}

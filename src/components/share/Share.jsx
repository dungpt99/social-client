import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

export default function Share({ changeStatus }) {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("desc", desc.current.value);
      try {
        await axios.post(`${PF}/post/uploads`, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(`${PF}/post`, newPost);
      } catch (error) {
        console.log(error);
      }
    }
    desc.current.value = null;
    setFile(null);
    changeStatus(true);
  };
  return (
    <div className="share">
      <div className="share__top">
        <div className="share__top-img">
          <img src={user.avatar || PF + "/assets/person/noavatar.png"} alt="" />
        </div>
        <input
          type="text"
          className="share__top-text"
          placeholder="What are you thinking?"
          ref={desc}
        />
      </div>
      <hr />
      {file && (
        <div className="shareImgContainer">
          <img src="shareImg" src={URL.createObjectURL(file)} alt="" />
          <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
        </div>
      )}
      <form className="share__bottom" onSubmit={submitHandler}>
        <div className="share__bottom-options">
          <label htmlFor="file" className="share__bottom-option">
            <PermMedia className="option__icon" htmlColor="tomato" />
            <span className="option__name">Photo or video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="share__bottom-option">
            <Label className="option__icon" htmlColor="blue" />
            <span className="option__name">Tag</span>
          </div>
          <div className="share__bottom-option">
            <Room className="option__icon" htmlColor="green" />
            <span className="option__name">Location</span>
          </div>
          <div className="share__bottom-option">
            <EmojiEmotions className="option__icon" htmlColor="goldenrod" />
            <span className="option__name">Feeling</span>
          </div>
        </div>
        <div className="share__bottom-btn">
          <button type="submit">Share</button>
        </div>
      </form>
    </div>
  );
}

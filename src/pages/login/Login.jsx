import { useContext, useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginWrapper__left">
          <div className="loginLogo">Social</div>
          <div className="loginDesc">
            Connect with friends and the world around on Social
          </div>
        </div>
        <form className="loginWrapper__right" onSubmit={handleClick}>
          <div className="loginWrapper__right-box">
            <input
              type="email"
              className="loginUsername"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              className="loginPassword"
              placeholder="Password"
              ref={password}
            />
          </div>
          <div className="loginWrapper__right-login">
            <button type="submit" disabled={isFetching}>
              Login
            </button>
          </div>
          <div className="loginWrapper__right-forgot">
            <span className="forgotPassword">Forgot Password?</span>
          </div>
          <div className="loginWrapper__right-create">
            <Link to="/register">
              <button>Create new account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${PF}/user`, user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="register">
      <form className="registerWrapper" onSubmit={handleClick}>
        <input type="text" placeholder="Name" required ref={name} />
        <input type="email" placeholder="Email" required ref={email} />
        <input type="password" placeholder="Password" required ref={password} />
        <input
          type="password"
          placeholder="Repeat password"
          required
          ref={passwordAgain}
        />
        <div className="registerWrapper__btn">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

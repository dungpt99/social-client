import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Register from "./pages/register/Register.jsx";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.js";
import { CircularProgress } from "@mui/material";
import Messenger from "./pages/messenger/messenger.jsx";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          axios.interceptors.request.use(
            (config) => {
              config.headers.authorization = `Bearer ${accessToken}`;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
        }
        const user = await axios.get(
          "https://socialserver12-2021.herokuapp.com/user/current"
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: user.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"}>
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/register"}>
          <Register />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/login"}>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path={process.env.PUBLIC_URL + "/profile/:id"}>
          {user ? <Profile /> : <CircularProgress />}
        </Route>
        <Route path={process.env.PUBLIC_URL + "/messenger"}>
          <Messenger />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

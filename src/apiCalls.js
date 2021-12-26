import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://socialserver12-2021.herokuapp.com/login",
      userCredential
    );
    if (localStorage) {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    }
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${res.data.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const user = await axios.get(
      "https://socialserver12-2021.herokuapp.com/user/current"
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: user.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

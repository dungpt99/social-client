import axios from "axios";

const AuthAxios = (token) => {
  axios.create({
    baseURL: process.env.baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default AuthAxios;

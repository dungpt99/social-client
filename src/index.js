import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

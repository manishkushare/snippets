import React from "react";
import ReactDOM from "react-dom";
import App from "./Component/App";
import { BrowserRouter } from "react-router-dom";
import "./stylesheets/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

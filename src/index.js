import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

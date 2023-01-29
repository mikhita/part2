import React from "react";
import ReactDOM from "react-dom/client";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

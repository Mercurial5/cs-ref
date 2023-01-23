import React from "react";
import ReactDOM from "react-dom/client";
import * as ReactRouter from "react-router-dom";
import * as ReactQuery from "./global/contexts/query";
import App from "./global/views/App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactRouter.BrowserRouter>
      <ReactQuery.Instance>
        <App />
      </ReactQuery.Instance>
    </ReactRouter.BrowserRouter>
  </React.StrictMode>
);

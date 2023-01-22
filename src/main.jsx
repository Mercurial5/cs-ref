import React from "react";
import ReactDOM from "react-dom/client";
import * as ReactQuery from "./global/contexts/query";
import * as ReactRouter from "react-router-dom";
import App from "./global/routes/App";
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

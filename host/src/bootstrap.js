import React from "react";
import ReactDOM from "react-dom";
import { MEFProvider } from "./mfe/Provider";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <MEFProvider>
      <App />
    </MEFProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

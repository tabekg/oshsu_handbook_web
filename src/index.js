import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/AppContainer";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import Index from "./views/Index";
import Landing from "./views/examples/Landing";
import Login from "./views/examples/Login";
import Profile from "./views/examples/Profile";
import Register from "./views/examples/Register";

ReactDOM.render(
  <AppContainer/>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

import Components from "views/Components/Components.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/covid-19" component={Components} />
      <Route exact path="/" component={ProfilePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

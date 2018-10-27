import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ForgotPassword from "./pages/forgotpassword/index"
import ForgotPasswordSuccess from "./pages/forgotpasswordsuccess/index"
import Register from "./pages/register/index"
import Login from "./pages/login/index"
import HomePage from "./pages/homepage/index"
import Profile from "./pages/profile/index"
import Event from "./pages/eventpage/index"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/register"} />} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/forgotPasswordSuccess" component={ForgotPasswordSuccess} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route path="/event" component={Event} />
      </Switch>
    );
  }
}

export default App;
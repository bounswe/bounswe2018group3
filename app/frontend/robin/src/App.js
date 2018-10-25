import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "./pages/signIn/index"
import SignUp from "./pages/signUp/index"
import ForgotPassword from "./pages/forgotPW/index"
import Register from "./pages/register/index"
import Login from "./pages/login/index"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/signIn"} />} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

export default App;
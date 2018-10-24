import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "./pages/signIn/index"
import SignUp from "./pages/signUp/index"
import ForgotPassword from "./pages/forgotPW/index"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/signIn"} />} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={ForgotPassword} />
      </Switch>
    );
  }
}

export default App;
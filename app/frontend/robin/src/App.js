import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import ForgotPassword from "./pages/forgotpassword/index"
import Register from "./pages/register/index"
import Login from "./pages/login/index"

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/register"} />} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

export default App;
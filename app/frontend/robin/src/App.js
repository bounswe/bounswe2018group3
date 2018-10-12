import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/home/index";
import ForgotPassword from "./pages/forgotpassword/index";
import Login from "./pages/login/index";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/home"} />} />

        <Route path="/home" component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/forgotpassword" component={ForgotPassword}/>

      </Switch>
    );
  }
}

export default App;
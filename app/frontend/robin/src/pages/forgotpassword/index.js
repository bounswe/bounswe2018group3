import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./forgotpassword.css"

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"

export default class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  handleSubmit(){

  }

  enableButton(){
    if(this.state.email === "")
      return (
        <button className="btn btn-lg btn-primary btn-block button-disabled" disabled type="submit">
          Reset password
        </button>
      )

    return (
      <button className="btn btn-lg btn-primary btn-block button-enabled" type="submit">
        Reset password
      </button>
    )
  }

  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="signin-container">
              <div className="account-wall">
                <div className="col-md-6 col-md offset-3">
                  <img src={logo} height="120px" alt="logo" />      
                </div>
                <h2 className="text-center">Robin</h2>
                <form className="form-signin">
                  <input type="text" className="form-control" placeholder="Email" required autofocus name="email" onChange={this.handleChange}/>
                  {this.enableButton()}
                </form>
            </div>
            <Link to="register" className="register-link">
              <p className="text-center new-account">Create an account </p>
            </Link>
            <div className="text-center">
              <p className="download-android-app">Download Android App</p>
              <img src={androidApp} height="40px" alt="androidApp" />
            </div>        
          </div>
        </div>
      </div>
    )
  }
}

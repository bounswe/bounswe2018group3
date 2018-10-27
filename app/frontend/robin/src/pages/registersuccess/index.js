import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"


export default class RegisterSuccess extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="signin-container">
              <div className="account-wall">
                <div className="col-mxs-12">
                  <img src={logo} className="mx-auto d-block" height="100px" alt="logo" />      
                </div>
                <h2 className="text-center">Robin</h2>
                <form className="form-signin">
                  <p>A confirmation mail was sent to your email with the instructions. Please check your email to activate your account.</p>
                </form>
            </div>
            <Link to="login" className="register-link">
              <p className="text-center new-account">Go back to login page </p>
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

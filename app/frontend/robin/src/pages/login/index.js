import React from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css"

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"

import { LOGIN_URL } from "../constants/backend-urls";

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  handleSubmit(e){
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password,
      username: "paradox"
    };
    var headers= {
      "Content-Type": "application/json"
    };
    var options = {
      method: "post",
      url: LOGIN_URL,
      data: data,
      headers: headers,
    };
    axios(options).then(response => {
      if(response.status === 200){
        var token = response.data.token;
        console.log(token);
        Cookies.set("jwtToken", token);
        console.log(Cookies.get("jwtToken"))
      }
    }).catch(error => {
      console.error(error);
    })
  }

  enableButton(){
    if(this.state.email === "" || this.state.password === "")
      return (
        <button className="btn btn-lg btn-primary btn-block button-disabled" disabled type="submit">
          Sign in
        </button>
      )

    return (
      <button className="btn btn-lg btn-primary btn-block button-enabled" type="submit" onClick={e => this.handleSubmit(e)}>
        Sign in
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
                  <input type="password" className="form-control" placeholder="Password" required name="password" onChange={this.handleChange}/>
                  {this.enableButton()}
                  <hr />
                  <div className="forgot-password" >
                    <Link to="/forgotpassword" className="forgot-password-link">
                      <p className="text-center forgot-password-text">Forgot Password</p>
                    </Link>
                  </div>
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

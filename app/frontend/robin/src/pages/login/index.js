import React from 'react';
import { Link, Redirect } from "react-router-dom";

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
      password: "",
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  validateEmail(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.email === ""){
      return(
        <input type="text" className="form-control" placeholder="Email" required autofocus name="email" value={this.state.email} onChange={this.handleChange}/>
      );
    }
    else if(re.test(String(this.state.email).toLowerCase())){
      return(
        <input type="text" className="form-control is-valid" placeholder="Email" required autofocus name="email" value={this.state.email} onChange={this.handleChange}/>
      );
    }
    else{
      return(
        <input type="text" className="form-control is-invalid" placeholder="Email" required autofocus name="email" value={this.state.email} onChange={this.handleChange}/>
      );
    }
  }

  checkFormErrors(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidity = re.test(String(this.state.email).toLowerCase());
    return emailValidity;
  }

  handleSubmit(e){
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password,
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
        this.setState({redirect: true});
      }
    }).catch(error => {
      console.error(error);
    })
  }

  enableButton(){
    if(this.state.email === "" || this.state.password === "" || !this.checkFormErrors())
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
    if(this.state.redirect === true){
      return (
        <Redirect to="/home"/>
      );
    }
      return (
        <div className="container">
          <div className="row">
            <div className="signin-container">
              <div className="account-wall">
                <div className="col-xs-12">
                  <img src={logo} className="mx-auto d-block" height="100px" alt="logo" />      
                </div>
                <h2 className="text-center">Robin</h2>
                <form className="form-signin">
                  {this.validateEmail()}
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

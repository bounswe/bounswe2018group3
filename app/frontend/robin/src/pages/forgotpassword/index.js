import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./forgotpassword.css"

import axios from 'axios';

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"

import { FORGOT_PASSWORD_URL } from "../constants/backend-urls";

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  handleSubmit(e){
    e.preventDefault();
    var data = {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password,
      password2: this.state.password,
    };
    var headers= {
      "Content-Type": "application/json"
    };
    var options = {
      method: "post",
      url: FORGOT_PASSWORD_URL,
      data: data,
      headers: headers,
    };
    axios(options).then(response => {
      if(response.status === 200){
        var token = response.data.key;
      }
    }).catch(error => {
      console.error(error);
    })
  }

  checkFormErrors(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidity = re.test(String(this.state.email).toLowerCase());
    return emailValidity;
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

  enableButton(){
    if(this.state.email === "" || !this.checkFormErrors())
      return (
        <button className="btn btn-lg btn-primary btn-block button-disabled" disabled type="submit">
          Reset password
        </button>
      )

    return (
      <button className="btn btn-lg btn-primary btn-block button-enabled" type="submit" onClick={e => this.handleSubmit(e)}>
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
                  {this.validateEmail()}
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

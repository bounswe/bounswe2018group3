import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./register.css"

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      username:"",
      password: "",
      repeatPasswprd: "",
      acceptedTerms: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  async handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  handleCheckboxChange(){
    this.setState({acceptedTerms: !this.state.acceptedTerms})
  }

  handleSubmit(){

  }

  validateUsername(){

  }

  validatePassword(){
    if(this.state.password === ""){
      return (
        <input type="password" className="form-control" placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange}/>
      );
    }
    else if(this.state.password.length < 8 || this.state.password.length > 20){
      return (
        <input type="password" className="form-control is-invalid" placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange}/>
      );
    }
    else {
      return (
        <input type="password" className="form-control is-valid" placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange}/>
      );
    }
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
    var passwordValidity = (this.state.password.length < 20) && (this.state.password.length > 8)
    return emailValidity && passwordValidity;
  }

  enableButton(){
    if(this.state.email === "" || this.state.password === "" || this.state.name === "" || this.state.username === "" || this.state.acceptedTerms === false || !this.checkFormErrors())
      return (
        <button className="btn btn-lg btn-primary btn-block button-disabled" disabled type="submit">
          Sign up
        </button>
      )

    return (
      <button className="btn btn-lg btn-primary btn-block button-enabled" type="submit">
        Sign up
      </button>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7 text-container">
          <h3>
            Robin is the latest platform for social activities
          </h3>
          </div>
          <div className="col-md-5">
          <div className="signup-container">
            <div className="account-wall">
              <div className="col-md-6 col-md offset-3">
                <img src={logo} height="120px" alt="logo" />      
              </div>
              <h2 className="text-center">Robin</h2>
              <form className="form-signup">
                <input type="text" className="form-control" placeholder="Full Name" required autofocus name="name" onChange={this.handleChange}/>
                <input type="text" className="form-control" placeholder="Username" required autofocus name="username" onChange={this.handleChange}/>
                {this.validateEmail()}
                {this.validatePassword()}
                <div className="terms">
                  <input type="checkbox" onChange={this.handleCheckboxChange} onClick={() => {this.checked = !this.checked}}/> I accept terms and conditions
                </div>
                {this.enableButton()}
              </form>
            </div>
            <Link to="login" className="login-link">
              <p className="text-center new-account">Already have an account</p>
            </Link>
            <div className="text-center">
              <p className="download-android-app">Download Android App</p>
              <img src={androidApp} height="40px" alt="androidApp" />
            </div>        
          </div>
          </div>
        </div>
      </div>
    )
  }
}

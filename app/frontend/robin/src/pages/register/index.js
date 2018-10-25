import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./register.css"

import logo from '../robin.svg';
import androidApp from "./google-play.png"

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      username:"",
      password: "",
      repeatPasswprd: "",
      acceptedTerms: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
  
    this.setState({[name] : value,});
  }

  handleCheckboxChange(){
    this.setState({acceptedTerms: !this.state.acceptedTerms})
  }

  handleSubmit(){

  }

  enableButton(){
    if(this.state.email === "" || this.state.password === "" || this.state.name === "" || this.state.username === "" || this.state.acceptedTerms === false)
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
          <div className="signup-container">
            <div className="account-wall">
              <div className="col-md-6 col-md offset-3">
                <img src={logo} height="120px" alt="logo" />      
              </div>
              <h2 className="text-center">Robin</h2>
              <form className="form-signup">
                <input type="text" className="form-control" placeholder="Full Name" required autofocus name="name" onChange={this.handleChange}/>
                <input type="text" className="form-control" placeholder="Email" required autofocus name="email" onChange={this.handleChange}/>
                <input type="text" className="form-control" placeholder="Username" required autofocus name="username" onChange={this.handleChange}/>
                <input type="password" className="form-control" placeholder="Password" required name="password" onChange={this.handleChange}/>
                {this.enableButton()}
                <div className="terms">
                  <input type="checkbox" onChange={this.handleCheckboxChange} onClick={() => {this.checked = !this.checked}}/> I accept terms and conditions
                </div>
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
    )
  }
}

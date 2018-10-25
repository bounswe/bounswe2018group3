import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css"

import logo from '../robin.svg';
import androidApp from "./google-play.png"

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target
      
        this.setState({[name] : value,});
    }

    handleSubmit(){

    }

    enableLoginButton(){
        if(this.state.email === "" || this.state.password === "")
            return (
                <button className="btn btn-lg btn-primary btn-block login-button-disabled" disabled type="submit">
                    Sign in
                </button>
            )

        return (
            <button className="btn btn-lg btn-primary btn-block login-button-enabled" type="submit">
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
                                    {this.enableLoginButton()}
                                
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
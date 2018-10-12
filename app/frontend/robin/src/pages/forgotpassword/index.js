import React from 'react';

import LoginHeader from "../components/loginHeader.js"

import "../css/login.css"

export default class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.state = {email: ""}
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target
      
        this.setState({[name] : value,});
    }

    handleSubmit(){

    }

    render() {
        return (
            <div>
                <LoginHeader />
                <div class="forgotPasswordWrapper">
                    <h2>Recover your account</h2>
                    <p>Please enter your email to reset your password</p>
                    <input type="text" name="email" class="registrationInput input" placeholder="email" onChange={(e)=>this.handleChange(e)}/>
                    <button type="submit" class="signbut bolder" onClick={this.handleSubmit}>Reset Password</button>
                </div>
            </div>
        )
    }
}

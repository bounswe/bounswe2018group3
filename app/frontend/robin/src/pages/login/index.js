import React from 'react';

import Header from "../components/header.js"

import "../css/login.css"

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
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
                <Header />
                <div class="forgotPasswordWrapper">
                    <h2>Login to your account</h2>
                    <input type="text" name="email" class="registrationInput input" placeholder="email" onChange={(e)=>this.handleChange(e)}/>
                    <input type="password" name="password" class="registrationInput input" placeholder="password" onChange={(e)=>this.handleChange(e)}/>
                    <button type="submit" class="signbut bolder" onClick={this.handleSubmit}>Login</button>
                </div>
            </div>
        )
    }
}

import React from 'react';

import "../css/login.css"

export default class SignUpFrom extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "",
            email: "",
            password: "",
            password_re: "",
            password_has_error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target
      
        this.setState({
                [name] : value, 
            }, () => {
                if (name === "password" || name === "password_re"){
                    this.checkPassword();
                }}
        );
    }

    checkPassword() {
        if(!this.state.password || !this.state.password_re || this.state.password !== this.state.password_re) {
            this.setState({password_has_error:true});
       }
       else {
            this.setState({password_has_error:false});
       }
    }

    handleSubmit(){

    }

    render() {
        return (
            <div>
                <div class="signUpWrapper">
                    <div class="signUpTitle">
                        Create an account    
                    </div>
                    <div class="registrationContainer">
                        <div class="formbox">
                            <input type="text" name="fname" class="registrationInput name" placeholder="First name" onChange={(e)=>this.handleChange(e)}/>
                            <input type="text" name="lname" class="registrationInput name lastname" placeholder="Last name" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div class="formbox">
                            <input type="text" name="username" class="registrationInput input" placeholder="username" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div class="formbox">
                            <input type="text" name="email" class="registrationInput input" placeholder="email" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div class="formbox">
                            <input type="password" name="password" class="registrationInput input" placeholder="password" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div class="formbox">
                            <input type="password" name="password_re" class="registrationInput input" placeholder="confirm password" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div class="formbox">
                            <button type="submit" class="signbut bolder" onClick={this.handleSubmit}>Sign Up</button>
                        </div>
                        <div class="formbox">
                            <button type="submit" class="signbut bolder signup--facebook"></button>
                        </div>
                        <div class="formbox">
                            {this.state.password_has_error && this.state.password && this.state.password_re && <p class="pwnotmatch">Passwords do not match!</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

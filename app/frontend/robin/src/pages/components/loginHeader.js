import React from 'react';

import { Link } from "react-router-dom";

import "../css/login.css"

export default class LoginHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCheckbox(){
        this.refs["cb"].checked = !this.refs["cb"].checked;
    }

    async handleChange(e) {
        const { name, value } = e.target
      
        this.setState({
                [name] : value, 
            });
    }

    handleSubmit(){

    }

    render() {
        var login = <td class="button" onClick={this.handleSubmit}>LOGIN</td>;
        if(this.state.username === "" ||  this.state.password === ""){
            login = <Link to="/login"><td class="button">LOGIN</td></Link>;
        }
        return (
            <div>
                <div class="header">
                    <Link to="/">
                        <div class="logoWrapper">
                            <p class="logo">Robin</p>
                        </div>
                    </Link>
                    <div class="signInWrapper">
                        <div class="tableWrapper">
                            <table class="signInTable">
                                <tr>
                                    <td>
                                        <input type="text" name="username" class="inputText" placeholder="username" onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <input type="password" name="password" class="inputText" placeholder="password" onChange={this.handleChange}/>
                                    </td>
                                    {login}    
                                </tr>
                                <tr>
                                    <td>
                                        <div class="row2" onClick={this.handleCheckbox}>
                                            <input type="checkbox" checked={true} ref={"cb"}/>
                                            Keep me logged in
                                        </div>
                                    </td>
                                    <td>
                                        <Link to="/forgotpassword">
                                            <td class="row2 h">Forgot your password?</td>
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

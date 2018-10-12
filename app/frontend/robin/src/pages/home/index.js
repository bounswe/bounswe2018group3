import React from 'react';

import LoginHeader from "../components/loginHeader.js";
import SignUpForm from '../components/signUpFrom.js';

import "../css/login.css"

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <LoginHeader />
                <div class="infoContainer">
                    Robin is the newest platform for following, sharing and attending cultural activities
                </div>
                <SignUpForm />
            </div>
        )
    }
}

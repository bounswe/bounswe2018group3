import React from 'react';
import { Link } from "react-router-dom";
import "../css/login.css"

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <div class="header">
                    <Link to="/">
                        <div class="logoWrapper">
                            <p class="logo">Robin</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

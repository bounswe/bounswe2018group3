import React from 'react';
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';
import "./index.css"

import logo from '../../../images/robin.svg';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      redirect: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout(e){
    e.preventDefault();
    Cookies.remove("token");
    this.setState({redirect: "/login"});
  }

  render() {
    if(this.state.redirect !== ""){
      return (<Redirect to={this.state.redirect}/>)
    }
    return (
      <div>
        <nav className="nav navbar navbar-expand-md navbar-light bg-light fixed-top">
          <div className="navbar-collapse collapse w-25 order-1 order-md-0 dual-collapse2 col-md-3 ">
            <a href="/"><img src={logo} className="mr-2 ml-md-5" height="40px" alt="logo" /></a>
            <a className="navbar-brand" href="/">Robin</a>
          </div>
          <div className="mx-auto mx-0 order-0 col-md-6">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active mx-auto w-100">
                <form className="form-inline my-2 my-lg-0 mx-auto w-80">
                  <input className="form-control mr-sm-2 col-10" type="search" aria-label="Search" placeholder="search"/>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </form>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </li>
            </ul>
          </div>
          <div className="navbar-collapse collapse w-25 order-3 dual-collapse2 col-md-3 ">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-1">
                <button className="btn"><i className="fa fa-user"/></button>
              </li>
              <li className="nav-item mr-1">
                <button className="btn"><i className="fa fa-bell"/></button>
              </li>
              <li className="nav-item mr-1">
                <button className="btn"><i className="fa fa-envelope"/></button>
              </li>
              <li className="nav-item dropdown mr-5">
                <button className="btn  dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                  <i className="fa fa-bars"/>
                </button>
                <div className="dropdown-menu">
                  <button className="btn"><i className="fa fa-cogs mr-1"/>Settings</button>
                  <button className="btn" onClick={e => this.handleLogout(e)}><i className="fa fa-sign-out mr-1"/>Logout</button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

import React from 'react';
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';
import "./index.css"

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
        <nav className="navbar navbar-expand-md navbar-light bg-light nav">
          <a className="navbar-brand" href="/">Robin</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0 mx-auto ">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div className="options-container">
              <div className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Dropdown link
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Link 1</a>
                    <a class="dropdown-item" href="#">Link 2</a>
                    <a class="dropdown-item" href="#">Link 3</a>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
class Dropdown extends React.Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <a
          className="nav-link dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Dropdown
        </a>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#nogo">
            Item 1
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 2
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 3
          </a>
        </div>
      </div>
    );
  }
}

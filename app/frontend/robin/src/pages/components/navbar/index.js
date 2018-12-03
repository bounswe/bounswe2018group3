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
      redirect: "",
      searchQuery : ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleNavbarChange = this.handleNavbarChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout(e){
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("userid");
    this.setState({redirect: "/login"});
  }

  handleProfile(e){
    e.preventDefault();
    if(this.props.currentPath.substring(0,8) === "/profile"){
      return;
    }
    else
      this.setState({redirect: "/profile/" + Cookies.get("userid")});
  }

  handleNavbarChange(e) {
    this.setState({...this.state, searchQuery: e.target.value});
  }

  handleSearch(e){
    e.preventDefault();
    if(this.props.currentPath === "/searchresults"){
      Cookies.set("searchQ", this.state.searchQuery);
      console.log(Cookies.get("searchQ"));
      window.location.reload();
      return;
    }
    else
      Cookies.set("searchQ", this.state.searchQuery);
      this.setState({...this.state,redirect: "/searchresults"});
  }

  render() {
    if(this.state.redirect !== ""){
      if(this.state.redirect === "/profile"){
        return (<Redirect to={{
          pathname: this.state.redirect,
          token: Cookies.get("token")
        }}/>)
      }
      else
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
                <div className="float-left w-80">
                  <form className="form-inline my-2 my-lg-0 mx-0 w-100">
                    <input className="form-control col-10 col-md-8 col-lg-10" type="search" value={this.state.searchQuery} onChange={this.handleNavbarChange} aria-label="Search" placeholder="search"/>
                    <span className="input-group-btn float-right">
                      <button className="btn btn-default" type="submit" onClick={e => this.handleSearch(e)}>
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </form>
                </div>
                <button className="navbar-toggler float-right w-20 my-3" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </li>
            </ul>
          </div>
          <div className="navbar-collapse collapse w-25 order-3 dual-collapse2 col-md-3 ">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-1">
                <button className="btn" onClick={e => this.handleProfile(e)}><i className="fa fa-user"/></button>
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

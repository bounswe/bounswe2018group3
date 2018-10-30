import React from 'react';
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';


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

  handleLogout(){
    Cookies.remove("token");
    this.setState({redirect: "/login"});
  }

  render() {
    if(this.state.redirect !== ""){
      return (<Redirect to={this.state.redirect}/>)
    }
    return (
      <div>
        <Navbar light expand="md" className="nav">
          <NavbarBrand href="/" className="nav-brand">Robin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <div className="search-container"> 
            <div className="input-group stylish-input-group">
              <input type="text" className="form-control"  placeholder="Search" />
                <span className="input-group-addon">
                  <button type="submit">
                  <div className="search-button">
                    <span className="fa fa-search search-button"></span>
                    </div>
                  </button>  
             </span>
            </div>
          </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Messages</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem>
                    Need Help
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
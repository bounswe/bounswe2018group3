import React from 'react';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import logo from '../../images/robin.svg';
import androidApp from "../../images/google-play.png"

import NavBar from "../components/navbar/index"
import Cookies from 'js-cookie';


export default class CreateEventSuccess extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      eventName: Cookies.get("eventName"),
      eventInfo: Cookies.get("eventInfo"),
      eventDate: Cookies.get("eventDate"),
      eventTime: Cookies.get("eventTime"),
      eventPrice: Cookies.get("eventPrice") ? Cookies.get("eventPrice") : "free",
      numberOfGuests: Cookies.get("numberOfGuests")

    }
  }

  render() {
      return (
        <div>
        <div className="mb-70">
          <NavBar currentPath={this.props.location.pathname}/>
        </div>
        <div className="container">
          <div className="row">
            <div className="forgotpasssword-container">
              <div className="account-wall">
                <form className="form-forgotpasssword">
                <h2 className="text-center">Event Created Successfully</h2>
                  <p>An event was successfully created with the following properties:</p>
                  <h3> Name</h3>
                  <p>{this.state.eventName}</p>
                  <h3> Info</h3>
                  <p>{this.state.eventInfo}</p>
                  <h3> Date</h3>
                  <p>{this.state.eventDate}</p>
                  <h3> Time</h3>
                  <p>{this.state.eventTime}</p>
                  <h3> Price</h3>
                  <p>{this.state.eventPrice}</p>
                  <h3>Number of guests</h3>
                  <p>{this.state.numberOfGuests}</p>
                </form>
            </div>
            <Link to="home" className="register-link">
              <p className="text-center new-account">Go back to homepage </p>
            </Link>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

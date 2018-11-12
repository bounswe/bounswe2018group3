import React from "react";

import GuestBar from "../components/guestBar/index";
import Navbar from "../components/navbar/index";

import "./index.css";

var exampleProfile = {
  name: "John Doe",
  cardSummary: "I am a software developer"
}

export default class PrivateProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      cardSummary: ""
    }

    this.state = exampleProfile;
  }

  render(){
    return (
      <div>
        <div className="wrapper position-absolute">
          <GuestBar/>
        </div>
        <div className="mb-70">
          <Navbar currentPath={this.props.location.pathname}/>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
        <div className="card" >
          <img className="card-img-top w-100" src="https://lh3.googleusercontent.com/a8_ujXr3VWHstGkxgJL1TkqfrytP4r_52QhcvqRQVaQPRQ9DHdQ6seI99qc4jLjC0WDM=h900" alt="Card image"  />
          <div className="card-body">
            <h4 className="card-title">{this.state.name}</h4>
            <p className="card-text">{this.state.cardSummary}</p>
            <div className="address">								
              
                <p className="text-center"><i className="fa fa-lock" aria-hidden="true"></i></p>
                <p className="text-center">This user's profile is private</p>
                  <button href="" className="btn btn-md btn-success btn-block w-10 mx-auto">
                    <i className="fa fa-user-plus add-friend-image" aria-hidden="true"></i>
                    Add Friend
                  </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

}
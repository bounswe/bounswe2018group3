import React from "react";

import {Redirect, Link} from "react-router-dom";

import GuestBar from "../components/guestBar/index";
import Navbar from "../components/navbar/index";

import Cookies from 'js-cookie';
import axios from 'axios';

import "./index.css";

import { USERS_URL, GET_USER_PIC_URL } from "../constants/backend-urls"


var exampleProfile = {
  first_name: "",
  last_name: "",
  cardSummary: "I am a software developer"
}

export default class PrivateProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      bio: ""
    }

    this.handleAddFriend = this.handleAddFriend.bind(this);
  }

  async componentDidMount(){
    if(this.props.location.pathname.substring(16) === undefined || this.props.location.pathname.substring(16) === "")
      return;

    var headers= {
      "Content-Type": "application/json",
      "Authorization" : "JWT " + Cookies.get("token")
    };
    var options = {
      method: "GET",
      url: USERS_URL + this.props.location.pathname.substring(16),
      headers: headers,
    };
    await axios(options).then(async response => {
      console.log(response);
      if(response.status === 200){
        this.setState({
          ...this.state,
          id: response.data.id,
          bio: response.data.bio,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          profilePic: response.data.profile_pic,
          followedUsers: response.data.followedUsers,
          followers: response.data.followers,
          private: response.data.private,
        });        
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
    options = {
      method: "GET",
      url: GET_USER_PIC_URL + this.props.location.pathname.substring(16),
      headers: headers,
    }
    await axios(options).then(response => {
      console.log("*************" + response);
      if(response.status === 200){
        this.setState({profilePic: response.data.profile_pic})
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })

  }

  handleAddFriend(){

  }

  render(){
    if(this.props.location.pathname.substring(16) === undefined || this.props.location.pathname.substring(16) === ""){
      return(
        <div>
          <h2>
            User not found!
          </h2>
        </div>
      )
    }
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
            <h4 className="card-title">{this.state.first_name + " " + this.state.last_name}</h4>
            {/*<p className="card-text">{this.state.bio}</p>*/}
            <div className="address">								
              <p className="text-center"><i className="fa fa-lock" aria-hidden="true"></i></p>
              <p className="text-center">This user's profile is private</p>
              <button href="" className="btn btn-md btn-success btn-block w-10 mx-auto">
                <i className="fa fa-user-plus add-friend-image" aria-hidden="true"></i>
                Add Friend
              </button>
              <button href="" className="btn btn-md btn-primary btn-block w-10 mx-auto">
                <i className="fa fa-envelope add-friend-image" aria-hidden="true"></i>
                Message
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

}
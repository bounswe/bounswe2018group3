import Event from "./event"
import Comment from "./comment"
import Navbar from "../components/navbar/index"
import GuestBar from "../components/guestBar/index"
import React from 'react';
import "./eventpage.css"

export default class EventPage extends React.Component{
  render(){
    return (
      <React.Fragment>
      <div className="mb-70">
        <Navbar currentPath={this.props.location.pathname}/>
      </div>
      <div className="wrapper position-absolute">
        <GuestBar/>
      </div>
        <Event />
        <h2></h2>
        <h2 style={{margin:'22px'}}>
        Comments:
        </h2>
        <Comment />
      </React.Fragment>
    );
  }
};
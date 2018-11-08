import Event from "./event"
import Comment from "./comment"
import Navbar from "../components/navbar/index"
import React from 'react';
import "./eventpage.css"

export default (props) => {
  return (
    <React.Fragment>
    <Navbar currentPath={this.props.location.pathname}/>
      <Event />
      <h2></h2>
      <h2 style={{margin:'22px'}}>
      Comments:
      </h2>
      <Comment />
    </React.Fragment>
  );
};
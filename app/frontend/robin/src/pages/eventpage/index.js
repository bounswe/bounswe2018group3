import Event from "./event"
import Comment from "./comment"
import Navbar from "./components/navbar/index"
import React from 'react';

export default (props) => {
  return (
    <React.Fragment>
    <Navbar />
      <Event />
      <h2></h2>
      <h2>
      Comments:
      </h2>
      <Comment />
    </React.Fragment>
  );
};
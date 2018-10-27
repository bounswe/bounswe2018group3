import Event from "./event"
import Navbar from "../homepage/navbar"
import React from 'react';

export default (props) => {
  return (
    <React.Fragment>
    <Navbar />
      <Event />
    </React.Fragment>
  );
};
import React from 'react';
import { Link } from "react-router-dom";

export default class Terms extends React.Component {
  render(){
    return (
      <div>
        <h1 className="text-center">Terms and Conditions</h1>
        <p className="text-center">You hereby agree to give AA to all members of the CmpE 451 Group 3 for the class of CmpE 451 2018-2019 Fall</p>
        <Link to="register" className="register-link">
          <p className="text-center new-account">Go back </p>
        </Link>
      </div>
    )
  }

}
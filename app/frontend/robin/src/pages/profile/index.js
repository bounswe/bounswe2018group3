import React from 'react';

import ProfileCard from "./profile"
import Navbar from "../components/navbar/index"
export default class Profile extends React.Component{
  render(){
    return (
      <div>
        <div className="mb-70">
          <Navbar/>
        </div>
        <ProfileCard/>
      </div>
    );
  }
};
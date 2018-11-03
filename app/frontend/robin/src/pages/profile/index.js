import React from 'react';

import ProfileCard from "./profile"
import Navbar from "../components/navbar/index"
export default (props) => {
  return (
    <div>
      <Navbar/>
      <ProfileCard/>
    </div>
  );
};
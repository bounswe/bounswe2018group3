import React from 'react';

import ProfileCard from "./profile"
import Navbar from "../components/navbar/index"
export default (props) => {
  return (
    <div>
      <div className="mb-70">
        <Navbar/>
      </div>
      <ProfileCard/>
    </div>
  );
};
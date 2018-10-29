import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { Button } from 'reactstrap';
import NavBar from "./navbar"
import EventComp from "./eventComp.js"
import borisPhoto from "./boris.png"
import skyGif from "./T9L0.gif"
import gazaSurf from "./gazaSurf.jpg"
import "./eventComp.css"
import Cookies from 'js-cookie';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      token: Cookies.get("jwtToken")
    }
    console.log(this.state.token);
  }

  render(){
    if(this.state.token === undefined){
      return (
        <Redirect to="/login"/>
      );
    }
    return (
      <div>
        <NavBar />
        <div className="eventContainer col-md-6">
          <EventComp title="Boris Brejcha for Cercle" subtitle="Château de Fontainebleau, 24 Oct 2018"
            eventPhoto={borisPhoto} eventDetails=" This is the masterpiece of his musical work so far. His unbelievable passion for music combined with the longtime experience as a producer for different genres fuses into this exclusive distinctive and very special sound. "/>
          <EventComp title="Gaza Surf Club [Gazze Sörf Kulübü]" subtitle="Salt Ankara, 22 Nov 2018"
            eventPhoto={gazaSurf} eventDetails="Gazze Şeridi hava saldırılarıyla sarsılırken bölgede yaşayan kimi gençler için sörf yapmak, yıkıntılardan uzaklaşarak biraz olsun özgür hissetmek için tek yoldur. "/>
          <EventComp title="Draconids Meteor Shower Peaks" subtitle="Mount Chiliad, 8 Oct 2018"
            eventPhoto={skyGif} eventDetails="This shower, generated by debris dropped by Comet 21P/Giacobini-Zinner, usually delivers relatively few meteors. But it has occasionally been much more prolific."/>
        </div>
      </div>
    );
  }
};
import React from 'react';
import { Link, Redirect } from "react-router-dom";

import NavBar from "../components/navbar/index"
import EventComp from "./components/event/index"
import borisPhoto from "./boris.png"
import skyGif from "./T9L0.gif"
import gazaSurf from "./gazaSurf.jpg"
import "./index.css"
import Cookies from 'js-cookie';

export default class SearchResults extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      token: Cookies.get("token"),
      events : [{title:'Boris Brejcha for Cercle',
                subtitle:'Château de Fontainebleau, 24 Oct 2018',
                eventPhoto:borisPhoto,
                eventDetails:'This is the masterpiece..' },
              {title:'Boris Brejcha for Cercle',
              subtitle:'Château de Fontainebleau, 25 Oct 2018',
              eventPhoto:borisPhoto,
              eventDetails:'This is the mastedsdfrpiece..' },
              {title:'Boris Brejcha for Cercle',
              subtitle:'Château de Fontainebleau, 24 Oct 2018',
              eventPhoto:borisPhoto,
              eventDetails:'This is the qweqwemasterpiece..' }]
    }
  }

  render(){
    if(this.state.token === undefined){
      return(
        <Redirect to="/login"/>
      )
    }
    return (
      <div>
        <div className="mb-70">
          <NavBar currentPath={this.props.location.pathname}/>
        </div>
        <div className="eventContainer col-md-6">
        {this.state.events.map(comp => {
              return <EventComp title={comp.title} subtitle={comp.subtitle}
              eventPhoto={comp.eventPhoto} eventDetails={comp.eventDetails}/>
          
            })}
        </div>
      </div>
    );
  }
};
import React from 'react';
import { Link, Redirect } from "react-router-dom";

import NavBar from "../components/navbar/index"
import EventComp from "./components/event/index"
import borisPhoto from "./boris.png"
import skyGif from "./T9L0.gif"
import gazaSurf from "./gazaSurf.jpg"
import "./index.css"
import Cookies from 'js-cookie';
import { compose } from 'redux';

import { SEARCH_URL } from "../constants/backend-urls";

export default class SearchResults extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      query: this.props.location.query,
      token: Cookies.get("token"),
      events : [{ key: 1,
                  title:'Boris Brejcha for Cercle',
                subtitle:'Château de Fontainebleau, 24 Oct 2018',
                eventPhoto:borisPhoto,
                eventDetails:'This is the masterpiece..' },
              {key: 2,
                title:'Boris Brejcha for Cercle',
              subtitle:'Château de Fontainebleau, 25 Oct 2018',
              eventPhoto:borisPhoto,
              eventDetails:'This is the mastedsdfrpiece..' },
              {key: 1,
                title:'Boris Brejcha for Cercle',
              subtitle:'Château de Fontainebleau, 24 Oct 2018',
              eventPhoto:borisPhoto,
              eventDetails:'This is the qweqwemasterpiece..' }]
    };
  }

  componentDidMount(e){
    // var data = {
    //   // TODO: Change here according to API
    //   search: Cookies.get("searchQ")
    // };
    // var headers= {
    //   "Content-Type": "application/json"
    // };
    // var options = {
    //   method: "post",
    //   // TODO: Update search url page.
    //   url: SEARCH_URL,
    //   data: data,
    //   headers: headers,
    // };
    // axios(options).then(response => {
    //   if(response.status === 200){
    //     var eventList = response.data.token;
    //     console.log(eventList);
    //     this.setState({events: eventList});
    //   }
    // }).catch(error => {
    //   console.error(error);
    //   this.setState({error: true});
    // })
  } 

  render(){
    if(this.state.token === undefined){
      return(
        <Redirect to="/login"/>
      )
    }
    console.log(Cookies.get("searchQ"))
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
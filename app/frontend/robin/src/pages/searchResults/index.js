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
import axios from 'axios';

import { SEARCH_URL } from "../constants/backend-urls";

export default class SearchResults extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      query: this.props.location.query,
      token: Cookies.get("token"),
      events : []
    };

    this.showResults = this.showResults.bind(this);
  }

  componentDidMount(e){
    var data = {
      // TODO: Change here according to API
      search: Cookies.get("searchQ")
    };
    var headers= {
      "Content-Type": "application/json"
    };
    var options = {
      method: "GET",
      // TODO: Update search url page.
      url: SEARCH_URL + "?search=" + Cookies.get("searchQ"),
      data: data,
      headers: headers,
    };
    axios(options).then(response => {
      if(response.status === 200){
        var eventList = response.data;
        this.setState({events: eventList});
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
  } 

  showResults(){
    if(this.state.events.length === 0){
      return <h3 className="text-center">No event or user found!</h3>
    }
    else{
      var ret = [];
      for(let i = 0; i < this.state.events.length; i++){
        ret.push(<EventComp title={this.state.events[i].name} subtitle={this.state.events[i].locatio}
          eventPhoto={this.state.events[i].country} eventDetails={this.state.events[i].info} id={this.state.events[i].id}/>)
      }
      return ret;
      
  }
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
          {this.showResults()}
        </div>
      </div>
    );
  }
};
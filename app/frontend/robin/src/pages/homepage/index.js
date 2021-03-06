import React from 'react';
import { Link, Redirect } from "react-router-dom";

import NavBar from "../components/navbar/index"
import EventComp from "./components/event/index"
import "./index.css";
import Cookies from 'js-cookie';
import axios from 'axios';

import { HOMEPAGE_URL } from "../constants/backend-urls";

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      query: this.props.location.query,
      token: Cookies.get("token"),
      events : [],
      page : 0 
    };
  }

  componentDidMount(e){
    var data = {
      // TODO: Change here according to API
      search: Cookies.get("searchQ")
    };
    var headers= {
      "Content-Type": "application/json",
      "Authorization" : "JWT " + Cookies.get("token")
    };
    var options = {
      method: "GET",
      // TODO: Update search url page.
      url: HOMEPAGE_URL + this.state.page,
      data: data,
      headers: headers,
    };
    axios(options).then(response => {
      //console.log(response);
      if(response.status === 200){
        var eventList = response.data;
        console.log(eventList);
        this.setState({events: eventList});
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
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
        {this.state.events.map((comp, key) => {
              return <EventComp title={comp.name} subtitle={comp.locatio}
              eventPhoto={comp.country} eventDetails={comp.info} id={comp.id}/>
            })}
        </div>
      </div>
      
    );
  }
};
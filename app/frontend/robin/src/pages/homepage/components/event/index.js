import React from 'react';
import Cookies from 'js-cookie';

import { Link, Redirect } from "react-router-dom";
import { EVENT_URL, EVENT_ATTEND_URL, EVENT_INTEREST_URL,USERS_URL, RATING_URL, DELETE_URL, EVENT_COMMENTS_URL, EVENT_IMAGES_URL } from "../../../constants/backend-urls";
import axios from 'axios';


export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      redirect: "",
    }
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  async componentDidMount(e){
    //console.log(this.state);
    var data = {
      // TODO: Change here according to API
      id: this.state.id
    };
    var headers= {
      "Content-Type": "application/json",
      //"Authorization" : "JWT " + Cookies.get("token")
    };
    var options = {
      method: "GET",
      // TODO: Update search url page.
      url: EVENT_URL + this.props.id,
      data: data,
      headers: headers,
    };
    //console.log(options);
    await axios(options).then(async response => {
      //console.log(response);
      if(response.status === 200){
        var eventList = response.data;
        this.setState({event: eventList, error: false});
        this.setState({creator: {id: this.state.event.creator[0], firstName: this.state.event.creator[1], lastName: this.state.event.creator[2]}});
        if(this.state.event.images.length > 0){
          var data = {
            // TODO: Change here according to API
            id: this.state.id
          };
          var headers= {
            "Content-Type": "application/json",
            //"Authorization" : "JWT " + Cookies.get("token")
          };
          var options = {
            method: "GET",
            // TODO: Update search url page.
            url: EVENT_IMAGES_URL + this.state.event.images[0],
            data: data,
            headers: headers,
          };
          await axios(options).then(async response => {
            console.log(response);
            var headers= {
              "Content-Type": "application/json",
              //"Authorization" : "JWT " + Cookies.get("token")
            };
            var options = {
              method: "GET",
              // TODO: Update search url page.
              url: response.data.content,
              //data: data,
              headers: headers,
            };
            this.setState({shownImage: response.data.content})
          })
        }
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
  }
   


  handleEventClick(e){
    e.preventDefault();
    //Cookies.set("clickedEvent", this.props.id);
    this.setState({redirect: "/event/" + this.props.id})
  }


  render() {
    if(this.state.redirect !== ""){
      return(
        <Redirect to={this.state.redirect}/>
      )
    }
    return (
      <div>
      <div class="row">
        <div className="event-container"></div>
        <div class="col">
        <div class="card">
          <div class="card-body">
            <a href="../event" onClick={e => this.handleEventClick(e)}>{this.props.title}</a>
            <div class="card-title">{this.props.subtitle}</div>
          </div>
          <img width="100%" src={this.state.shownImage} alt="Card image cap" />
          <div class="card-body">
            <div class="card-text">{this.props.eventDetails}</div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

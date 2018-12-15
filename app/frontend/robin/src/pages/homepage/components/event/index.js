import React from 'react';
import Cookies from 'js-cookie';

import { Link, Redirect } from "react-router-dom";

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      redirect: "",
    }
    this.handleEventClick = this.handleEventClick.bind(this);
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
          <img width="100%" src={this.props.eventPhoto} alt="Card image cap" />
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

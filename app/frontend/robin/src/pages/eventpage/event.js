import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css";
import borisPhoto from "../homepage/boris.png";
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { compose } from 'redux';
import axios from 'axios';
import { EVENT_URL, USERS_URL, RATING_URL, DELETE_URL } from "../constants/backend-urls";

  export default class Event extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        redirect : "",
          event: 1,
          creator : "",
          rating : "",
          joined: false,
          interested: false,
      }
      this.onStarClick = this.onStarClick.bind(this);
      this.getUser = this.getUser.bind(this);
      this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
      this.handleJoin = this.handleJoin.bind(this);
      this.handleInterested = this.handleInterested.bind(this);
      this.handleJoinClick = this.handleJoinClick.bind(this);
      this.handleInterestedClick = this.handleInterestedClick.bind(this);
    }
    onStarClick(nextValue, prevValue, name) {     
      var data = {
        // TODO: Change here according to API
        //id: Cookies.get("clickedEvent")
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        // TODO: Update search url page.
        url: RATING_URL + this.state.event.id + "/" + nextValue,
        data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var resp = response.data;
          console.log(resp);
          this.setState({rating: resp});
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })

    }

    componentDidMount(e){
      var data = {
        // TODO: Change here according to API
        id: Cookies.get("clickedEvent")
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        // TODO: Update search url page.
        url: EVENT_URL + Cookies.get("clickedEvent"),
        data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var eventList = response.data;
          console.log(eventList);
          this.setState({event: eventList});
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
      
    } 

    getUser(e){
        var data = {
        // TODO: Change here according to API
        //id: Cookies.get("clickedEvent")
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        // TODO: Update search url page.
        url: USERS_URL + e,
        data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var resp = response.data;
          console.log(resp);
          return resp.username;
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })

    } 

    handleDeleteEvent(e){
      var data = {
        // TODO: Change here according to API
        //id: Cookies.get("clickedEvent")
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "DELETE",
        // TODO: Update search url page.
        url: DELETE_URL + this.state.event.id,
        data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var resp = response.data;
          console.log(resp);
          this.setState({redirect: "/home"});
          
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    }
    handleJoinClick(){
      this.setState({joined: !this.state.joined})
    }

    handleInterestedClick(){
      this.setState({interested: !this.state.interested})
    }

    handleJoin(){
      if(!this.state.joined){
        return(
          <button href="#" className="btn btn-primary" style={{marginLeft:'30px', marginTop:'30px'}} onClick={this.handleJoinClick}>Join Event</button>
        )
      }
      else{
        return(
          <button href="#" className="btn btn-success" style={{marginLeft:'30px', marginTop:'30px'}} onClick={this.handleJoinClick}>Going</button>

        )
      }
    }

    handleInterested(){
      if(!this.state.interested){
        return(
          <button href="#" class="btn btn-primary" style={{marginLeft:'30px', marginTop:'30px'}} onClick={this.handleInterestedClick}>Mark as Interested</button>
        )
      }
      else{
        return(
          <button href="#" class="btn btn-success" style={{marginLeft:'30px', marginTop:'30px'}} onClick={this.handleInterestedClick}>Interested</button>

        )
      }
    }

  
    render() {
      const { rating } = this.state;
        if(this.state.redirect === "/home"){
          return (<Redirect to={this.state.redirect}/>)
        }
        return (

          <div class="card">
          <h3 class="card-title" style={{marginTop:'30px', marginBottom:'30px', marginLeft:'30px'}}>{this.state.event.name}</h3>
          <div class="row">
            <div class="col-sm-6">
              <img class="card-img-top img-fluid shadow-lg bg-white" src={this.state.event.country} alt="Card image cap" style={{marginBottom:'20px', maxWidth:'100%',height:'auto'}}/>
            </div>
            <div class="col-sm-6">
            <div class="card-body">
                <div class="row" style={{marginLeft:'15px'}}>
                  <div class="col-sm-9">
                    Price: {this.state.event.price}
                  </div>
                  <div class="col-sm-3">
                  <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={this.state.rating}
                  onStarClick={this.onStarClick.bind(this)}
                  />  
                  </div>
                </div>
                <div class="row" style={{marginLeft:'15px'}}>
                  <div class="col-sm-9">
                  Date-Time : {this.state.event.date} {this.state.event.time}
                  </div>
                  <div class="col-sm-3">
                  {this.getUser(this.state.event.creator)}
                  </div>
                </div>

                <div class="row" style={{marginTop: '15px'}}>
                <div class="col-sm-12">
                <p class="card-text shadow-sm bg-white rounded" style={{marginLeft:'30px', marginRight:'30px', marginTop:'20px'}}>{this.state.event.info}</p>
                </div>
                </div>
              {this.handleJoin()}
              {this.handleInterested()}
                <a href="#" class="btn btn-primary"  onClick={e => this.handleDeleteEvent(e)} style={{marginLeft:'30px', marginTop:'30px'}}>Delete Event</a>
            </div>
                
              </div>
            </div>
          </div>
        
      )
    }
  }

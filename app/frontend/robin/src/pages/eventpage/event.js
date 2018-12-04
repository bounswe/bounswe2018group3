import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css";
import borisPhoto from "../homepage/boris.png";
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import Cookies from 'js-cookie';
import { compose } from 'redux';
import axios from 'axios';
import { EVENT_URL, USERS_URL, RATING_URL } from "../constants/backend-urls";

  export default class Event extends React.Component {

    constructor(props){
      super(props);
      this.state = {
          event: 1,
          creator : "",
          rating : ""
      }
      this.onStarClick = this.onStarClick.bind(this);
      this.getUser = this.getUser.bind(this);
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


  
    render() {
      const { rating } = this.state;

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
                <a href="#" class="btn btn-primary" style={{marginLeft:'30px', marginTop:'30px'}}>Join Event</a>
                <a href="#" class="btn btn-primary" style={{marginLeft:'30px', marginTop:'30px'}}>Mark as Interested</a>
            </div>
            </div>
          </div>

        </div>
      )
    }
  }

import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';

import axios from 'axios';

import { EVENT_URL } from "../constants/backend-urls";
export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        eventName: "",
        eventInfo: "",
        artistName: "",
        eventDate: "",
        eventTime: "",
        eventPrice: "",
        imageLink: "",
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleCheckboxChange(){
      this.setState({isGoing: !this.state.isGoing})
    }

    handleNameChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        console.log(this.state)
    }
    // TODO : I'm getting bad request 400 over here.
    handleCreate(e){
      var data = {
       name : this.state.eventName,
       info : this.state.eventInfo,
       artist : this.state.artistName,
       date : this.state.eventDate,
       time : this.state.eventTime,
       price : this.state.eventPrice,
       country : this.state.imageLink
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "POST",
        url: EVENT_URL,
        data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          console.log(response);
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    }
  
    render() {
      return (
        <React.Fragment>
          <div>
            <Navbar currentPath={this.props.location.pathname}/>
          </div>
          <div className="container-event col-xs-12 col-sm-10 col-md-6">
            <form className="form-event">
            <div className="row">
                <div className="col-lg-6">
                  Name of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventName"
                      type="text"
                      value={this.state.eventName}
                      placeholder="Name"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Info about the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventInfo"
                      type="text"
                      value={this.state.eventInfo}
                      placeholder="Info"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Artist of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="artistName"
                      type="text"
                      value={this.state.artistName}
                      placeholder="Artist"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Date of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventDate"
                      type="text"
                      value={this.state.eventDate}
                      placeholder="Date"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Time of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventTime"
                      type="text"
                      value={this.state.eventTime}
                      placeholder="Time"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Image link for event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="imageLink"
                      type="text"
                      value={this.state.imageLink}
                      placeholder="Image Link"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Price of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventPrice"
                      type="text"
                      value={this.state.eventPrice}
                      placeholder="Price"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              
              <div className="row">
                <div className="col-lg-6">
                  Number of guests:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventPrice"
                      type="number"
                      value={this.state.numberOfGuests}
                      onChange={this.handleInputChange}/>
                  </div>
                </label>
              </div>
              <br />
              <div class="row-event">
                <label>
                  Is going:
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleCheckboxChange} />
                </label>
              </div>
              <div className="row">
                <div className="col-xs-2 mx-auto">
                  <button type="button" onClick={e => this.handleCreate(e)} className="btn btn-success mx-auto">Create</button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );
    }
  }
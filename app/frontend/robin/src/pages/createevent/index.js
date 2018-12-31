import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';

import { Link, Redirect } from "react-router-dom";

import axios from 'axios';
import { push } from 'react-router-redux';

import { EVENT_URL, USERS_URL } from "../constants/backend-urls";

export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: "",
        name: "",
        info: "",
        artistName: "",
        date: "",
        time: "",
        price: "",
        imageLink: "",
        creator: {},
        isGoing: true,
        numberOfGuests: 2,
        submitClicked: false,
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleErrorMessage = this.handleErrorMessage.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.checkError = this.checkError.bind(this);
      this.getUser = this.getUser.bind(this);
    }

    componentDidMount(){
      this.setState({creator: this.getUser(Cookies.get("userid"))})
      
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
        //data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var resp = response.data;
          this.setState({creator: resp});
          return resp.username;
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    

    }

    handleCreate(e){
      this.setState({submitClicked: true});
      if(this.checkError()){
        Cookies.set("eventName", this.state.name);
        Cookies.set("eventInfo", this.state.info);
        Cookies.set("eventDate", this.state.date);
        Cookies.set("eventTime", this.state.time);
        Cookies.set("eventPrice", this.state.price);
        Cookies.set("numberOfGuests", this.state.numberOfGuests);
      }
      else
        return;
      var data = {
        name : this.state.name,
        info : this.state.info,
        artist : this.state.artistName,
        date : this.state.date,
        time : this.state.time,
        price : this.state.price,
        country : this.state.imageLink,
        //creator: this.state.creator,
      };
      var headers= {
        //"Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "POST",
        url: EVENT_URL,
        data: data,
        headers: headers,
      };
      console.log(options);
      axios(options).then(response => {
        console.log(response);
        if(response.status === 201){
          console.log(response);
          this.setState({redirect: "/createEventSuccess"});
          //window.location.reload();
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    }

    checkError(){
      if(this.state.name === "" || this.state.date === "" || this.state.time === ""){
        return false;
      }
      else return true;
    }

    handleErrorMessage(){
      if(this.state.submitClicked){
        if(this.state.name === ""){
          return(
            <div className="text-danger text-center ">
              Event name cannot be empty
            </div>
          );
        }
        else if(this.state.date === ""){
          return(
            <div className="text-danger text-center ">
              Event date cannot be empty
            </div>
          );
        }
        else if(this.state.time === ""){
          return(
            <div className="text-danger text-center ">
              Event time cannot be empty
            </div>
          );
        }
      }
      return;
    }
  
    render() {
      console.log(this.state);
      if(this.state.redirect === "/createEventSuccess"){
        return (<Redirect to={this.state.redirect}/>)
      }
      return (
        <React.Fragment>
          <div>
            <Navbar currentPath={this.props.location.pathname}/>
          </div>
          <div className="container-event col-xs-12 col-sm-10 col-md-6">
            <h2 className="text-center">Create an Event</h2>
            <form className="form-event">
            <div className="row">
                <div className="col-lg-6">
                  Name of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="name"
                      type="text"
                      value={this.state.name}
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
                      name="info"
                      type="text"
                      value={this.state.info}
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
                    <input type="text" placeholder="yyyy-mm-dd"  name="date" value={this.state.date} onChange={this.handleNameChange}/>
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
                      name="time"
                      type="text"
                      value={this.state.time}
                      placeholder="hh:mm"
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
                      name="price"
                      type="text"
                      value={this.state.price}
                      placeholder="Price"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              

              <br />
              
              {this.handleErrorMessage()}
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
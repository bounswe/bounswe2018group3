import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';

import { Link, Redirect } from "react-router-dom";

import axios from 'axios';
import { push } from 'react-router-redux';

import { EVENT_URL } from "../constants/backend-urls";

export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: Cookies.get("userid"),
        redirect: "",
        private: false,
        submitClicked: false,
      };
  
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);

      
    }

    handleCheckboxChange(){
      this.setState({private: !this.state.private})
    }

    handleNameChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleSave(){}
  
    render() {
      if(this.state.id === undefined || this.state.id === ""){
        return (<Redirect to="/login" />)
      }
      return (
        <React.Fragment>
          <div>
            <Navbar currentPath={this.props.location.pathname}/>
          </div>
          <div className="container-event col-xs-12 col-sm-10 col-md-6">
            <h2 className="text-center">Settings</h2>
            <form className="form-event">
            <div class="or-seperator"><strong>Privacy Settings</strong></div>              
              <div className="row">
                <p>
                  <input type="checkbox" name="private" onChange={this.handleCheckboxChange} onClick={() => {this.checked = !this.checked}}/> Private Profile
                </p>
                <br/>
                <p><i>
                  Setting your profile private will disable those who do not follow you from reaching to your personal info.
                  The only info they can find will be your name and profile photo.
                </i></p>
              </div>
              <br/>
              <div className="row">
                <h6>Message Settings</h6>
              </div>
              <div className="row">
              Who can message me
              </div>
              <div className="row">
                <select>
                  <option value="one">Everybody</option>
                  <option value="two">My followers</option>
                  <option value="three">Nobody</option>
                </select>
                <p><i>
                  <br/>
                  You may change your message settings in order to specify who can message you. 
                </i></p>
              </div>  
              

              <div class="or-seperator"><strong>Notification Settings</strong></div> 
              <div className="row">
                <h6>Interested Event Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
                <select>
                  <option value="one">Event gets modified</option>
                  <option value="two">Events gets canceled</option>
                  <option value="three">Never</option>
                </select>
                <p><i>
                  <br/>
                  Interested events are the events that you are interested in. You may choose to get notifications whenever 
                  there is a modification about the event, when the event gets canceled or to never get any notifications about
                  the event. 
                </i></p>
              </div>  

              <br/>
            
              <div className="row">
                <h6>Attending Event Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
                <select>
                  <option value="one">Event gets modified</option>
                  <option value="two">Events gets canceled</option>
                  <option value="three">Never</option>
                </select>
                <p><i>
                  <br/>
                  Going events are the events that you are going to attend. You may choose to get notifications whenever 
                  there is a modification about the event, when the event gets canceled or to never get any notifications about
                  the event. 
                </i></p>
              </div>  

              <br/>

              <div className="row">
                <h6>Following Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
              <p>
                <input type="checkbox" onClick={() => {this.checked = !this.checked}}/> Someone I follow creates an event 
                <br/> 
                <input type="checkbox" onClick={() => {this.checked = !this.checked}}/> Someone I follow is interested in an event 
                <br/>
                <input type="checkbox" onClick={() => {this.checked = !this.checked}}/> Someone I follow is going to an event
                <br/>
                <input type="checkbox" onClick={() => {this.checked = !this.checked}}/> Never
                
              </p>
              <p><i>
                  When you follow someone, you may also choose to get notifications about that person. You may choose to get
                  notifications whenever that person creates an event, is interested in an event, is attending an event or 
                  not to get any notifications at all.
                </i></p>

              </div>  

              <br/>
       
              <div className="row">
                <div className="col-xs-2 mx-auto">
                  <button type="button" onClick={e => this.handleSave(e)} className="btn btn-success mx-auto">Save</button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );
    }
  }
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
            <div className="row">
              <h5>Privacy Settings</h5><br/>
            </div>
            <div className="row">
              <p>
                <input type="checkbox" name="private" onChange={this.handleCheckboxChange} onClick={() => {this.checked = !this.checked}}/> Private Profile
              </p>
            </div>

            <br/>

            <div className="row">
              <h5>Event Notification Settings</h5><br/>
            </div>
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
            </div>         
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